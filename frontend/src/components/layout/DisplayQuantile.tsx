import React, { useEffect, useState } from 'react';

import { extractor } from '../../service/fetcher';
import { Button } from '../atomic';
import { Card, Line } from '../molecule';

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
  const [data, setData] = useState<Array<number>>([]);
  const [dataSum, setDataSum] = useState<Array<number>>([]);
  const InitializeClick = () => {
    setData([]);
    setDataSum([]);
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
          setData(current => {
            return current.concat(
              quantile.map(quantileIndex => {
                return parseFloat(
                  lines[index]['metrics'][0]['quantiles'][quantileIndex],
                );
              }),
            );
          });

          setDataSum(current => {
            return [...current, parseFloat(lines[index]['metrics'][0]['sum'])];
          });
        }
      });
    }, timeMilliSecond);

    return () => clearInterval(interval);
  }, [baseUrl, name, timeMilliSecond]);

  return (
    <>
      <Card title={title}>
        <div>
          <Line data={data} title={title} />
          <Line data={dataSum} title={`Somme ${title}`} />
        </div>

        <Button onClick={InitializeClick}>initialiser</Button>
      </Card>
    </>
  );
};
