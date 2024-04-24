import React, { useEffect, useState } from 'react';
import { extractor } from 'src/service/fetcher';
import { MultiDataTypes } from 'src/utils';

import { Card, Line } from '.';

type MultiLineDataProps = {
  baseUrl: string;
  labels: ReadonlyArray<string>;
  title: string;
  max: number;
};

export const MultiLineData: React.FC<MultiLineDataProps> = ({
  baseUrl,
  labels,
  title,
  max,
}) => {
  const [multiData, setMultiData] = useState<ReadonlyArray<MultiDataTypes>>(
    labels.map(label => {
      return {
        label: label,
        data: [],
        borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      };
    }),
  );
  const [label, setlabel] = useState<Array<string>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      extractor(baseUrl, '/metrics').then(lines => {
        if (!lines) {
          setMultiData(current => {
            return current.map(data => {
              const currentData =
                data.data.length >= max ? data.data.slice(1) : data.data;
              return {
                data: [...currentData, 0],
                label: data.label,
                borderColor: data.borderColor,
              };
            });
          });
        } else {
          setMultiData(current => {
            return current.map(data => {
              const currentData =
                data.data.length >= max ? data.data.slice(1) : data.data;
              return {
                data: [
                  ...currentData,
                  parseFloat(
                    lines[lines.findIndex(line => line.name === data.label)]
                      .metrics[0].value,
                  ),
                ],
                label: data.label,
                borderColor: data.borderColor,
              };
            });
          });
        }
      });

      setlabel(current => {
        const currentLabel = current.length >= max ? current.slice(1) : current;
        return [
          ...currentLabel,
          new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(new Date()),
        ];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [baseUrl, label, multiData, max]);

  return (
    <>
      <Card title={title}>
        <Line data={multiData} labels={label} />
      </Card>
    </>
  );
};
