import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInstances, useSetCurrentInstance } from 'src/context';
import { path } from 'src/utils';

import { Button, ButtonOutline, Icon } from '../atomic';
import { Card } from '../molecule';

export const Menu: React.FC = () => {
  const { instances, setInstances } = useInstances();
  const setCurrentInstance = useSetCurrentInstance();
  const navigate = useNavigate();

  return (
    <Card title="Instances">
      <div className="flex-1">
        {instances.map(instance => (
          <div className="flex" key={instance.name}>
            <Link className="flex-1" to={path.CHART}>
              <Button
                onClick={() => {
                  setCurrentInstance(instance);
                }}
              >
                {instance.name} : {instance.baseUrl}
              </Button>
            </Link>
            <ButtonOutline
              className="btn-error"
              onClick={() => {
                setInstances(
                  instances.filter(
                    inst =>
                      inst.name !== instance.name ||
                      inst.baseUrl !== instance.baseUrl,
                  ),
                );
                navigate(path.HOME);
              }}
            >
              <Icon name="trash" />
            </ButtonOutline>
          </div>
        ))}
      </div>
      <ButtonOutline
        className="btn-success"
        onClick={() => {
          navigate(path.FORM);
        }}
      >
        <Icon name="plus" />
      </ButtonOutline>
      <ButtonOutline
        className="btn-error"
        onClick={() => {
          setInstances([]);
          navigate(path.HOME);
        }}
      >
        <Icon name="trash" />
      </ButtonOutline>
    </Card>
  );
};
