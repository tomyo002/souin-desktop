type Metric = {
  name: string;
  help: string;
  type: string;
  metrics: [
    {
      value: string;
      labels: string;
      quantiles: {
        '0': string;
        '0.25': string;
        '0.5': string;
        '0.75': string;
        '1': string;
      };
      count: string;
      sum: string;
    },
  ];
};

declare module 'parse-prometheus-text-format' {
  function parsePrometheusTextFormat(text: string): ReadonlyArray<Metric>;
  export default parsePrometheusTextFormat;
}
