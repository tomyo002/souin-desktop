import React from 'react';

import { MultiLine } from './Chart/Multiline';
import { MultilineProps, lineData } from './Chart/types';

type Props =
  | ({ type: 'multiple' } & MultilineProps)
  | ({
      type: 'single';
    } & lineData);

export const ChartGuesser: React.FC<Props> = ({ type, ...rest }) => {
  switch (type) {
    case 'multiple':
      return <MultiLine {...(rest as MultilineProps)} />;
    case 'single':
      return null;
  }
};
