export type lineData = ReadonlyArray<number>;
export type chartLabels = ReadonlyArray<string>;

type commonChartProps = {
  min?: number;
  max?: number;
};

export type singlelineData = {
  label: string;
  data: lineData;
  borderColor: string;
};

export type MultilineProps = commonChartProps & {
  labels: chartLabels;
};
