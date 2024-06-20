import React, { createContext, useContext, useEffect, useState } from 'react';
import { InstanceType } from 'src/utils';

import { useStorage } from './StorageProvider';

type instancesContextProps = {
  instances: ReadonlyArray<InstanceType>;
  currentInstance?: InstanceType;
  setInstances: (instances: ReadonlyArray<InstanceType>) => void;
  setCurrentInstance: (instance: InstanceType) => void;
};
export const InstanceContext = createContext<instancesContextProps>({
  instances: [],
  currentInstance: undefined,
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
  const [instances, setInstances] = useState<ReadonlyArray<InstanceType>>([]);
  const [currentInstance, setCurrentInstance] = useState<InstanceType>();
  const storage = useStorage();
  const updateInstances = (newInstances: ReadonlyArray<InstanceType>) => {
    setInstances(newInstances);
    storage.setInstances(newInstances);

    setCurrentInstance(newInstances[newInstances.length - 1]);
  };

  useEffect(() => {
    storage.getInstances().then(allInstances => {
      setInstances(allInstances);
      setCurrentInstance(allInstances[0]);
    });
  }, [storage]);

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
