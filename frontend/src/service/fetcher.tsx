import parsePrometheusTextFormat from 'parse-prometheus-text-format';
import { InstanceType } from 'src/utils';

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

export function extractor(instance: InstanceType, endpoint: string) {
  return fetcher(
    instance.baseUrl,
    endpoint,
    'GET',
    instance.authentication
      ? {
          Authorization: `Basic ${instance.authentication}`,
        }
      : undefined,
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
