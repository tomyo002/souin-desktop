import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InstanceContext } from 'src/context';
import { path } from 'src/utils';

import { Button, ButtonOutline, H1, Icon } from '../atomic';

export const Menu: React.FC = () => {
  const { instances, setInstances, currentInstance, setCurrentInstance } =
    useContext(InstanceContext);
  const navigate = useNavigate();

  return (
    <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <H1 content="Instances" />
      <div className="flex-1">
        {instances.map(instance => (
          <div className="relative flex mb-2" key={instance.name}>
            <Link className="flex flex-1" to={path.CHART}>
              <Button
                className={`w-full ${currentInstance === instance && 'border-black'}`}
                onClick={() => {
                  setCurrentInstance(instance);
                }}
              >
                {instance.name} : {instance.baseUrl}
              </Button>
            </Link>
            <Button
              className="btn-circle btn-error border-white absolute right-0.5 top-0.5 btn-xs"
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
              <Icon className="text-white h-4 w-4" name="cross" />
            </Button>
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
    </div>
  );
};
