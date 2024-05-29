import React, { createContext, useContext, useState } from 'react';
import { InstanceData } from 'src/service/class';
import { IStorage } from 'src/service/interface';

export type AllowedStorage = 'localStorage' | 'sqliteStorage';
type storageContextProps = {
  storage: IStorage;
  currentType: AllowedStorage;
  setStorage: (storage: AllowedStorage) => void;
};

const storageContext = createContext<storageContextProps>({
  storage: new InstanceData('localStorage'),
  currentType: 'localStorage',
  setStorage: storage => console.log(storage),
});

export const StorageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [storage, setStorage] = useState<IStorage>(
    new InstanceData('localStorage'),
  );
  const [currentType, setCurrentType] =
    useState<AllowedStorage>('localStorage');

  const updateStorage = (name: AllowedStorage) => {
    setCurrentType(name);
    setStorage(new InstanceData(name));
  };

  return (
    <storageContext.Provider
      value={{ storage, currentType, setStorage: updateStorage }}
    >
      {children}
    </storageContext.Provider>
  );
};

export const useStorage = () => {
  const { storage } = useContext(storageContext);

  return storage;
};

export const useSelectStorage = () => {
  const { currentType, setStorage } = useContext(storageContext);

  return { currentType, setStorage };
};
