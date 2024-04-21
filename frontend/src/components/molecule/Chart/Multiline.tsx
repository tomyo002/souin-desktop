import parsePrometheusTextFormat from 'parse-prometheus-text-format';
import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Line as LineJs } from 'react-chartjs-2';

import { MultilineProps, singlelineData } from './types';

const defaultData: Record<string, singlelineData> = {};

export const MultiLine: React.FC<MultilineProps> = ({ labels, max, min }) => {
  const [data, setData] = useState<Record<string, singlelineData>>(
    labels.reduce((acc, current) => {
      acc[current] = {
        label: current,
        borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        data: min ? new Array(min).fill(0) : [],
      };
      return acc;
    }, defaultData),
  );
  const [timestamps, setTimestamps] = useState<ReadonlyArray<string>>(
    min ? new Array(min).fill(0) : [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:2019/metrics')
        .then(body => body.text())
        .then(parsePrometheusTextFormat)
        .then(values => values.filter(item => labels.includes(item.name)))
        .then(items => {
          setTimestamps(actualTimestamps => [
            ...(max && actualTimestamps.length >= max
              ? actualTimestamps.slice(1)
              : actualTimestamps),
            new Intl.DateTimeFormat('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }).format(new Date()),
          ]);
          setData(actualData => {
            return {
              ...items.reduce((acc, current) => {
                acc[current.name] = {
                  ...acc[current.name],
                  data: [
                    ...(max && acc[current.name].data.length >= max
                      ? acc[current.name].data.slice(1)
                      : acc[current.name].data),
                    parseFloat(current.metrics[0].value),
                  ],
                };

                return acc;
              }, actualData),
            };
          });
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [labels, max]);

  return (
    <LineJs
      data={{
        labels: [...timestamps],
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
        plugins: {
          legend: {
            onClick: () => undefined,
            position: 'bottom',
            align: 'start',
            labels: {
              padding: 24,
              borderRadius: 4,
              useBorderRadius: true,
            },
          },
        },
        elements: {
          point: {
            hitRadius: 20,
            backgroundColor: 'transparent',
            borderWidth: 0,
          },
        },
      }}
    />
  );
};
