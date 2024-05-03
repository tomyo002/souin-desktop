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
  const headers = {
    Authorization: `Basic ${authentication}`,
  };
  return fetcher(baseUrl, endpoint, 'GET', headers)
    .then(response => {
      if (!response.ok) {
        throw new Error('Authentication is not correct');
      }
      return response.text();
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
