import React from 'react';
import 'chart.js/auto';
import { Line as LineJs } from 'react-chartjs-2';

import { MultiDataTypes } from './type';

type LineProps = {
  data: ReadonlyArray<MultiDataTypes>;
  labels: Array<string>;
};

export const Line: React.FC<LineProps> = ({ data, labels }) => (
  <LineJs
    data={{
      labels,
      datasets: Object.values(data),
    }}
    datasetIdKey="0"
    options={{
      animation: {
        duration: 0,
        delay: 0,
      },
      responsive: true,
      scales: {
        x: {
          display: false,
        },
      },
    }}
  />
);
