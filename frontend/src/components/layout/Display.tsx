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

export const Display: React.FC<DisplayProps> = ({
  baseUrl,
  name,
  title,
  timeMilliSecond,
}) => {
  const [data, setData] = useState([0]);
  const InitialiserClick = () => {
    setData([0]);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      extractor(baseUrl, '/metrics').then(promise => {
        console.log(promise);
        if (promise === null) {
          setData(current => {
            return [...current, 0];
          });
        } else {
          setData(current => {
            return [
              ...current,
              parseFloat(
                promise[promise.findIndex(object => object['name'] == name)][
                  'metrics'
                ][0]['value'],
              ),
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
        <Line data={data} title={title} />
        <Button onclick={InitialiserClick}>initiliser</Button>
      </Card>
    </>
  );
};
