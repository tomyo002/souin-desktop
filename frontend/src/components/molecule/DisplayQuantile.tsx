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

export const DisplayQuantile: React.FC<DisplayProps> = ({
  baseUrl,
  name,
  title,
  timeMilliSecond,
}) => {
  const [data, setData] = useState<ReadonlyArray<number>>([]);
  const [dataSum, setDataSum] = useState<ReadonlyArray<number>>([]);
  const [label, setlabel] = useState<Array<string>>([]);
  const [labelSum, setlabelSum] = useState<Array<string>>([]);
  const ResetClick = () => {
    setData([]);
    setDataSum([]);
    setlabel([]);
    setlabelSum([]);
  };

  useEffect(() => {
    const quantile: Array<string> = ['0', '0.25', '0.5', '0.75', '1'];
    const interval = setInterval(() => {
      extractor(baseUrl, '/metrics').then(lines => {
        if (!lines) {
          setData(current => {
            return [...current, 0, 0, 0, 0, 0];
          });
          setDataSum(current => {
            return [...current, 0];
          });
        } else {
          const index = lines.findIndex(line => line['name'] === name);
          const path = lines[index].metrics[0];
          setData(current => {
            return [
              ...current,
              ...quantile.map(quantileIndex => {
                return parseFloat(path.quantiles[quantileIndex]);
              }),
            ];
          });

          setDataSum(current => {
            return [...current, parseFloat(path.sum)];
          });
        }
      });

      setlabel(current => {
        return [...current, ...quantile];
      });

      setlabelSum(current => {
        return [...current, dataSum.length.toString()];
      });
    }, timeMilliSecond);

    return () => clearInterval(interval);
  }, [baseUrl, name, data, dataSum, label, labelSum, timeMilliSecond]);

  return (
    <>
      <Card title={title}>
        <div>
          <Line data={data} labels={label} title={title} />
          <Line data={dataSum} labels={labelSum} title={`${title} sum`} />
        </div>

        <Button onClick={ResetClick}>Reset</Button>
      </Card>
    </>
  );
};
