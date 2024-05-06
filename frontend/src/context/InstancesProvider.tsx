import React, { createContext, useContext, useState } from 'react';
import { getAllInstances } from 'src/service';
import { InstanceType } from 'src/utils';

type instancesContextProps = {
  instances: ReadonlyArray<InstanceType>;
  currentInstance: InstanceType;
  setInstances: (instances: ReadonlyArray<InstanceType>) => void;
  setCurrentInstance: (instance: InstanceType) => void;
};

const InstanceContext = createContext<instancesContextProps>({
  instances: getAllInstances(),
  currentInstance: getAllInstances()[0],
  setInstances: (instances: ReadonlyArray<InstanceType>) => {
    console.log(instances);
  },
  setCurrentInstance: (instance: InstanceType) => {
    console.log(instance);
  },
});

export const InstancesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [instances, setInstances] = useState(getAllInstances());
  const [currentInstance, setCurrentInstance] = useState<InstanceType>(
    instances[0],
  );

  return (
    <InstanceContext.Provider
      value={{
        instances,
        setInstances,
        currentInstance,
        setCurrentInstance,
      }}
    >
      {children}
    </InstanceContext.Provider>
  );
};

export const useAllInstances = () => {
  const { instances } = useContext(InstanceContext);
  return instances;
};

export const useSetInstances = () => {
  const { setInstances } = useContext(InstanceContext);
  return () => {
    setInstances(getAllInstances());
  };
};

export const useCurrentInstance = () => {
  const { currentInstance } = useContext(InstanceContext);
  return currentInstance;
};

export const useSetCurrentInstance = () => {
  const { setCurrentInstance } = useContext(InstanceContext);
  return (instance: InstanceType) => {
    setCurrentInstance(instance);
  };
};
