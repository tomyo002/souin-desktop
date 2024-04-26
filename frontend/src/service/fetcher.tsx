import parsePrometheusTextFormat from 'parse-prometheus-text-format';

export function fetcher(
  baseUrl: string,
  endpoint: string,
  method: string = 'GET',
) {
  return fetch(`${baseUrl}${endpoint}`, {
    method: method,
  });
}

export function extractor(baseUrl: string, endpoint: string) {
  return fetcher(baseUrl, endpoint)
    .then(response => response.text())
    .then(parsePrometheusTextFormat)
    .catch(error => {
      return null;
      console.warn(error);
    });
}

export function checkHealth(baseUrl: string) {
  return fetcher(baseUrl, '/')
    .then(() => {
      return 'ok';
    })
    .catch(() => {
      return null;
    });
}
