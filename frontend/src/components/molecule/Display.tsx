import React, { useEffect, useState } from 'react';

import { extractor } from '../../service/fetcher';
import { Button } from '../atomic';

import { Card, Line } from '.';

type DisplayProps = {
  baseUrl: string;
  name: string;
  title: string;
  timeMilliSecond: number;
};

export const Display: React.FC<DisplayProps> = ({
  baseUrl,
  name,
  title,
  timeMilliSecond,
}) => {
  const [data, setData] = useState<ReadonlyArray<number>>([]);
  const [label, setlabel] = useState<Array<string>>([]);
  const ResetClick = () => {
    setData([]);
    setlabel([]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      extractor(baseUrl, '/metrics').then(lines => {
        if (!lines) {
          setData(current => {
            return [...current, 0];
          });
        } else {
          setData(current => {
            return [
              ...current,
              parseFloat(
                lines[lines.findIndex(line => line['name'] === name)][
                  'metrics'
                ][0]['value'],
              ),
            ];
          });
        }
      });
      setlabel(current => {
        return [...current, data.length.toString()];
      });
    }, timeMilliSecond);

    return () => clearInterval(interval);
  }, [baseUrl, name, label, data, timeMilliSecond]);

  return (
    <>
      <Card title={title}>
        <Line data={data} labels={label} title={title} />
        <Button onClick={ResetClick}>Reset</Button>
      </Card>
    </>
  );
};
