import React, { createContext, useState } from 'react';

export type AllowedStorage = 'localStorage' | 'sqliteStorage';
type storageContextProps = {
  storage: AllowedStorage;
  setStorage: (storage: AllowedStorage) => void;
};

export const storageContext = createContext<storageContextProps>({
  storage: 'localStorage',
  setStorage: storage => console.log(storage),
});

export const StorageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [storage, setStorage] = useState<AllowedStorage>('localStorage');

  return (
    <storageContext.Provider value={{ storage, setStorage }}>
      {children}
    </storageContext.Provider>
  );
};
