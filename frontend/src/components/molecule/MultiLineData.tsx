import React, { useEffect, useState } from 'react';
import { useCurrentInstance } from 'src/context';
import { extractor } from 'src/service';
import { MultiDataTypes } from 'src/utils';

import { Card, Line } from '.';

type MultiLineDataProps = {
  labels: ReadonlyArray<string>;
  title: string;
  max: number;
};

export const MultiLineData: React.FC<MultiLineDataProps> = ({
  labels,
  title,
  max,
}) => {
  const instance = useCurrentInstance();
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
      extractor(instance.baseUrl, '/metrics', instance.authentication).then(
        lines => {
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
        },
      );

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
  }, [instance, label, multiData, max]);

  return (
    <>
      <Card title={title}>
        <Line data={multiData} labels={label} />
      </Card>
    </>
  );
};
