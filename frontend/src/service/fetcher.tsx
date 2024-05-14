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
  return fetcher(instance.baseUrl, endpoint, 'GET', header(instance))
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

function header(instance: InstanceType) {
  const head: Record<string, string> = {};
  if (!instance.authentication) {
    return undefined;
  }
  if (instance.authentication.type === 'basicauth') {
    head['Authorization'] = `Basic ${instance.authentication.token}`;
  }
  if (instance.authentication.type === 'apikey') {
    head['X-API-Key'] = instance.authentication.token;
  }
  if (instance.authentication.type === 'JWT') {
    head['Authorization'] = `Bearer ${instance.authentication.token}`;
  }
  return head;
}
