import parsePrometheusTextFormat from 'parse-prometheus-text-format';

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

export function extractor(
  baseUrl: string,
  endpoint: string,
  authentication: string,
) {
  return fetcher(baseUrl, endpoint, 'GET', headers(`Basic ${authentication}`))
    .then(response => {
      if (!response.ok) {
        throw new Error('Authentication is not correct');
      }
      return response.text();
    })
    .then(parsePrometheusTextFormat)
    .catch(error => {
      return null;
      console.warn(error);
    });
}

export function checkHealth(baseUrl: string) {
  return fetcher(baseUrl, '/metrics').catch(() => {
    return false;
  });
}

function headers(authentication: string) {
  return {
    Authorization: authentication,
  };
}
