import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InstanceContext } from 'src/context';
import { InstanceType, path } from 'src/utils';

import { Button, ButtonOutline, H1, Icon } from '../atomic';

export const Menu: React.FC = () => {
  const [hoveredInstance, setHoveredInstance] = useState<InstanceType>();
  const { instances, setInstances, currentInstance, setCurrentInstance } =
    useContext(InstanceContext);
  const navigate = useNavigate();

  let hideTimeout: NodeJS.Timeout;

  const handleMouseEnter = (instance: InstanceType) => {
    clearTimeout(hideTimeout);
    setHoveredInstance(instance);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      setHoveredInstance(undefined);
    }, 300);
  };

  return (
    <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      <H1 content="Instances" />
      <div className="flex flex-col flex-1 gap-3 mt-3">
        {instances.map(instance => (
          <div className="flex" key={instance.name}>
            <div className="group flex-1 indicator">
              <Link className="w-full" to={path.CHART}>
                <Button
                  className={`btn-ghost w-full group-hover:bg-neutral-300 
                  ${currentInstance === instance && 'border-black group-hover:border-black'}`}
                  onClick={() => setCurrentInstance(instance)}
                >
                  {instance.name} : {instance.baseUrl}
                </button>
              </Link>
              <div className="indicator-item invisible group-hover:visible">
                <Button
                  className="btn-circle btn-error border-white btn-xs"
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
            </div>
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
