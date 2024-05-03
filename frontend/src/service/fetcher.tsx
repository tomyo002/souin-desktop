import parsePrometheusTextFormat from 'parse-prometheus-text-format';

import { getAuthentication } from './authentication';

export function fetcher(
  baseUrl: string,
  endpoint: string,
  method: string = 'GET',
  headers?: Record<string, string>,
) {
  return fetch(`${baseUrl}${endpoint}`, {
    method: method,
    headers,
  });
}

export function extractor(baseUrl: string, endpoint: string) {
  const { authentication } = getAuthentication();

  return fetcher(baseUrl, endpoint, 'GET', {
    Authorization: `Basic ${authentication}`,
  })
    .then(response => {
      switch (response.status) {
        case 401:
          throw new Error();
        default:
          return response.text();
      }
    })
    .then(parsePrometheusTextFormat)
    .catch(() => {
      return null;
    });
}

export function checkHealth(baseUrl: string) {
  return fetcher(baseUrl, '/metrics').catch(() => {
    return false;
  });
}

//case
//object dans le fetch
