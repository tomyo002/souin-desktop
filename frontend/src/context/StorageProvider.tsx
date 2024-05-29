import React, { createContext, useContext, useState } from 'react';
import { InstanceData } from 'src/service/class';
import { IStorage } from 'src/service/interface';
import { AllowedStorage } from 'src/utils';

type storageContextProps = {
  storage: IStorage;
  setStorage: (storage: AllowedStorage) => void;
};

const storageContext = createContext<storageContextProps>({
  storage: new InstanceData('localStorage'),
  setStorage: storage => console.log(storage),
});

export const StorageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [storage, setStorage] = useState<IStorage>(
    new InstanceData('localStorage'),
  );

  const updateStorage = (name: AllowedStorage) => {
    setStorage(new InstanceData(name));
  };

  return (
    <storageContext.Provider value={{ storage, setStorage: updateStorage }}>
      {children}
    </storageContext.Provider>
  );
};

export const useStorage = () => {
  const { storage } = useContext(storageContext);

  return storage;
};

export const useSelectStorage = () => {
  const { storage, setStorage } = useContext(storageContext);

  return { storage, setStorage };
};
