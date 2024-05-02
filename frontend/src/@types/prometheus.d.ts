type Metric = {
  name: string;
  help: string;
  type: string;
  metrics: [
    {
      value: string;
      labels: string;
      quantiles: Record<string, string>;
      count: string;
      sum: string;
    },
  ];
};

declare module 'parse-prometheus-text-format' {
  function parsePrometheusTextFormat(text: string): ReadonlyArray<Metric>;
  export default parsePrometheusTextFormat;
}
