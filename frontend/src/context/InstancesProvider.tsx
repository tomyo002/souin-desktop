import React, { createContext, useContext, useState } from 'react';
import {
  getAllInstances,
  setInstances as setInstancesStorage,
} from 'src/service';
import { InstanceType } from 'src/utils';

type instancesContextProps = {
  instances: ReadonlyArray<InstanceType>;
  currentInstance: InstanceType;
  setInstances: (instances: ReadonlyArray<InstanceType>) => void;
  setCurrentInstance: (instance: InstanceType) => void;
};
const allInstances = getAllInstances();
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
  const [instances, setInstances] = useState(allInstances);
  const [currentInstance, setCurrentInstance] = useState<InstanceType>(
    allInstances[0],
  );
  const updateInstances = (NewInstances: ReadonlyArray<InstanceType>) => {
    setInstances(NewInstances);
    setInstancesStorage(NewInstances);
    setCurrentInstance(NewInstances[NewInstances.length - 1]);
  };

  return (
    <InstanceContext.Provider
      value={{
        instances,
        setInstances: updateInstances,
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
  return setInstances;
};

export const useCurrentInstance = () => {
  const { currentInstance } = useContext(InstanceContext);
  return currentInstance;
};

export const useSetCurrentInstance = () => {
  const { setCurrentInstance } = useContext(InstanceContext);
  return setCurrentInstance;
};

export const useInstances = () => {
  const { instances, setInstances } = useContext(InstanceContext);
  return { instances, setInstances };
};
