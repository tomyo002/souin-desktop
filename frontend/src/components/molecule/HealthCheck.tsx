import React, { useEffect, useState } from 'react';
import { checkHealth } from 'src/service/fetcher';

import { AllowedIcon, Icon } from '../atomic';

type HealthCheckProps = {
  baseUrl: string;
};

export const HealthCheck: React.FC<HealthCheckProps> = ({ baseUrl }) => {
  const [icon, setIcon] = useState<AllowedIcon>('x-circle');
  useEffect(() => {
    checkHealth(baseUrl).then(response => {
      setIcon(!response ? 'x-circle' : 'check-circle');
    });
  }, [baseUrl]);

  return <Icon name={icon} />;
};
