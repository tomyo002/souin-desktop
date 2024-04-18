import parsePrometheusTextFormat from 'parse-prometheus-text-format';

export function fetcher(
  method: string = 'GET',
  baseUrl: string,
  endpoint: string,
) {
  return fetch(`${baseUrl}${endpoint}`, {
    method: method,
  });
}

export function extractor(baseUrl: string, endpoint: string) {
  return fetcher('GET', baseUrl, endpoint)
    .then(response => response.text())
    .then(parsePrometheusTextFormat)
    .catch(error => {
      return null;
      console.warn(error);
    });
}
