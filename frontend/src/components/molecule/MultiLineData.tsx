import React, { useEffect, useState } from 'react';
import { extractor } from 'src/service/fetcher';
import { MultiDataTypes } from 'src/utils';

import { Card, Line } from '.';

type MultiLineDataProps = {
  baseUrl: string;
  labels: ReadonlyArray<string>;
  title: string;
  max: number;
  authentication: string;
};

export const MultiLineData: React.FC<MultiLineDataProps> = ({
  baseUrl,
  labels,
  title,
  max,
  authentication,
}) => {
  const [multiData, setMultiData] = useState<ReadonlyArray<MultiDataTypes>>(
    labels.map(label => ({
      label: label,
      data: [],
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    })),
  );
  const [label, setlabel] = useState<ReadonlyArray<string>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      extractor(baseUrl, '/metrics', authentication).then(lines => {
        setMultiData(currents =>
          currents.map(({ data, label, ...rest }) => ({
            data: [
              ...(data.length >= max ? data.slice(1) : data),
              !lines
                ? 0
                : parseFloat(
                    lines[lines.findIndex(line => line.name === label)]
                      .metrics[0].value,
                  ),
            ],
            label,
            ...rest,
          })),
        );
      });

      setlabel(current => [
        ...(current.length >= max ? current.slice(1) : current),
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(new Date()),
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [baseUrl, label, multiData, max, authentication]);

  return (
    <>
      <Card title={title}>
        <Line data={multiData} labels={label} />
      </Card>
    </>
  );
};
