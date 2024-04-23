import React, { useEffect, useState } from 'react';

import { extractor } from '../../service/fetcher';

import { MultiDataTypes } from './type';

import { Card, Line } from '.';

type DisplayProps = {
  baseUrl: string;
  labels: ReadonlyArray<string>;
  title: string;
};

export const Display: React.FC<DisplayProps> = ({ baseUrl, labels, title }) => {
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
              return {
                data: [...data['data'], 0],
                label: data['label'],
                borderColor: data['borderColor'],
              };
            });
          });
        } else {
          setMultiData(current => {
            return current.map(data => {
              return {
                data: [
                  ...data['data'],
                  parseFloat(
                    lines[
                      lines.findIndex(line => line['name'] === data['label'])
                    ]['metrics'][0]['value'],
                  ),
                ],
                label: data['label'],
                borderColor: data['borderColor'],
              };
            });
          });
        }
      });
      setMultiData(current => {
        return current;
      });
      setlabel(current => {
        return [
          ...current,
          new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(new Date()),
        ];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [baseUrl, label, multiData]);

  return (
    <>
      <Card title={title}>
        <Line data={multiData} labels={label} />
      </Card>
    </>
  );
};
