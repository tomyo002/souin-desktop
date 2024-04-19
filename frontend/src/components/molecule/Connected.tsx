import React, { useEffect, useState } from 'react';

import { extractor } from '../../service/fetcher';
import { AllowedIcon, Icon } from '../atomic';

type PropsConnected = {
  baseUrl: string;
};

export const Connected: React.FC<PropsConnected> = ({ baseUrl }) => {
  const [icon, seticon] = useState<AllowedIcon>('x-circle');
  useEffect(() => {
    const interval = setInterval(() => {
      extractor(baseUrl, '/').then(response => {
        if (response === null) {
          seticon('x-circle');
        } else {
          seticon('check-circle');
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [baseUrl]);

  return <Icon name={icon} />;
};
