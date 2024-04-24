import React, { useEffect, useState } from 'react';
import { extractor } from 'src/service/fetcher';

import { AllowedIcon, Icon } from '../atomic';

type ConnectedProps = {
  baseUrl: string;
};

export const Connected: React.FC<ConnectedProps> = ({ baseUrl }) => {
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
