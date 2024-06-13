import React from 'react';
import { CHARTFORM, FormType, INSTANCEFORM } from 'src/utils';

import { ChartForm, InstanceForm, Layout } from '../layout';

type FormProps = {
  type: FormType;
};

export const FormPage: React.FC<FormProps> = ({ type }) => (
  <Layout>
    {type === INSTANCEFORM && <InstanceForm />}
    {type === CHARTFORM && <ChartForm />}
  </Layout>
);
