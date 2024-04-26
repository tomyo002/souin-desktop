import React, { useEffect, useState } from 'react';
import { checkHealth } from 'src/service/fetcher';

import { AllowedIcon, Icon } from '../atomic';

type HealthCheckProps = {
  baseUrl: string;
};

export const HealthCheck: React.FC<HealthCheckProps> = ({ baseUrl }) => {
  const [icon, setIcon] = useState<AllowedIcon>('x-circle');
  useEffect(() => {
    const interval = setInterval(() => {
      checkHealth(baseUrl).then(response => {
        setIcon(!response ? 'x-circle' : 'check-circle');
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [baseUrl]);

  return <Icon name={icon} />;
};
