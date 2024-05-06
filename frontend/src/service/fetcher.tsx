import parsePrometheusTextFormat from 'parse-prometheus-text-format';

import { getInstance } from './instance';

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
  const instance = getInstance();

  return fetcher(
    baseUrl,
    endpoint,
    'GET',
    instance.authentication && {
      Authorization: `Basic ${instance.authentication}`,
    },
  )
    .then(response => {
      switch (true) {
        case response.status >= 400:
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
