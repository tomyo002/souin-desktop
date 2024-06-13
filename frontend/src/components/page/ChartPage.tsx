import React, { useContext } from 'react';
import { ChartContext, useCurrentInstance } from 'src/context';

import { Button, Icon } from '../atomic';
import { Layout } from '../layout';
import { Card, MultiLineData } from '../molecule';

export const ChartPage: React.FC = () => {
  const instance = useCurrentInstance();
  const { charts, setCharts } = useContext(ChartContext);

  return (
    <Layout baseUrl={instance?.baseUrl} name={instance?.name}>
      <div className="grid grid-cols-2 gap-8">
        {charts.map(chart => (
          <div>
            <Card className="group indicator" title={chart.title}>
              <div className="invisible indicator-item group-hover:visible">
                <Button
                  className="btn-circle btn-error border-black btn-xs"
                  onClick={() => {
                    setCharts(charts.filter(ch => ch.title !== chart.title));
                  }}
                >
                  <Icon className="h-4 w-4" name="cross" />
                </Button>
              </div>
              <MultiLineData labels={chart.labels} max={chart.max} />
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};
