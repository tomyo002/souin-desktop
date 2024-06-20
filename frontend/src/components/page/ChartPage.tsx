import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChartContext, useCurrentInstance } from 'src/context';
import { path } from 'src/utils';

import { Button, ButtonOutline, Icon } from '../atomic';
import { Layout } from '../layout';
import { Card, MultiLineData } from '../molecule';

export const ChartPage: React.FC = () => {
  const instance = useCurrentInstance();
  const { charts, setCharts } = useContext(ChartContext);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setReloadKey(prevKey => prevKey + 1);
  }, [instance]);

  return (
    <Layout baseUrl={instance?.baseUrl} name={instance?.name}>
      <div className={`grid gap-8 ${charts.length >= 2 && 'grid-cols-2'}`}>
        {charts.length ? (
          charts.map(chart => (
            <div key={chart.title}>
              <Card className="group indicator" title={chart.title}>
                <div className="invisible indicator-item group-hover:visible">
                  <Button
                    className="btn-circle btn-error border-white btn-xs"
                    onClick={() => {
                      setCharts(charts.filter(ch => ch.title !== chart.title));
                    }}
                  >
                    <Icon className="h-4 w-4 text-white" name="cross" />
                  </Button>
                </div>
                <MultiLineData
                  key={reloadKey}
                  labels={chart.labels}
                  max={chart.max}
                />
              </Card>
            </div>
          ))
        ) : (
          <Link to={path.FORM_CHART}>
            <ButtonOutline className="btn-success">New chart</ButtonOutline>
          </Link>
        )}
      </div>
    </Layout>
  );
};
