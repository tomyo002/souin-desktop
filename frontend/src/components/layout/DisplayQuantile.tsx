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
  const [data, setData] = useState([0]);
  const [dataSum, setDataSum] = useState([0]);
  const InitialiserClick = () => {
    setData([0]);
    setDataSum([0]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      extractor(baseUrl, '/metrics').then(promise => {
        if (promise === null) {
          setData(current => {
            return [...current, 0, 0, 0, 0, 0];
          });
          setDataSum(current => {
            return [...current, 0];
          });
        } else {
          const index = promise.findIndex(object => object['name'] == name);
          setData(current => {
            return [
              ...current,
              parseFloat(promise[index]['metrics'][0]['quantiles']['0']),
              parseFloat(promise[index]['metrics'][0]['quantiles']['0.25']),
              parseFloat(promise[index]['metrics'][0]['quantiles']['0.5']),
              parseFloat(promise[index]['metrics'][0]['quantiles']['0.75']),
              parseFloat(promise[index]['metrics'][0]['quantiles']['1']),
            ];
          });
          setDataSum(current => {
            return [
              ...current,
              parseFloat(promise[index]['metrics'][0]['sum']),
            ];
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

        <Button onclick={InitialiserClick}>initialiser</Button>
      </Card>
    </>
  );
};
