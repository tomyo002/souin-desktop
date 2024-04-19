import React from 'react';
import 'chart.js/auto';
import { Line as LineJs } from 'react-chartjs-2';

type LineProps = {
  data: ReadonlyArray<number>;
  title: string;
  labels: Array<string>;
};

export const Line: React.FC<LineProps> = ({ data, title, labels }) => (
  <LineJs
    data={{
      labels,
      datasets: [
        {
          label: title,
          data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    }}
    datasetIdKey="0"
  />
);
