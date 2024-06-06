import React, { useContext } from 'react';
import { ChartContext, useCurrentInstance } from 'src/context';

import { Layout } from '../layout';
import { Card, MultiLineData } from '../molecule';

export const ChartPage: React.FC = () => {
  const instance = useCurrentInstance();
  const { charts } = useContext(ChartContext);

  return (
    <Layout baseUrl={instance?.baseUrl} name={instance?.name}>
      <div className="grid grid-cols-2 gap-8">
        {charts.map(chart => (
          <div key={chart.title}>
            <Card title={chart.title}>
              <MultiLineData labels={chart.labels} max={chart.max} />
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};
