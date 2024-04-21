import React, { useEffect, useState } from 'react';
import { Icon } from 'src/components/atomic';
import { extractor } from 'src/service/fetcher';

type HealthcheckProps = {
  baseUrl: string;
};

export const HealthCheck: React.FC<HealthcheckProps> = ({ baseUrl }) => {
  const [alive, setAlive] = useState<boolean>(false);
  useEffect(() => {
    extractor(baseUrl, '/').then(response => {
      setAlive(!!response);
    });
  }, [baseUrl]);

  return <Icon name={alive ? 'check-circle' : 'x-circle'} />;
};
