import React, { createContext, useContext, useState } from 'react';

type menuContextProps = {
  isMenu: boolean;
  setIsMenu: () => void;
};
const menuContext = createContext<menuContextProps>({
  isMenu: false,
  setIsMenu: () => {},
});

export const MenuProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isMenu, setIsMenu] = useState(false);
  const updateIsMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <menuContext.Provider
      value={{
        isMenu,
        setIsMenu: updateIsMenu,
      }}
    >
      {children}
    </menuContext.Provider>
  );
};

export const useMenu = () => {
  const { isMenu } = useContext(menuContext);
  return isMenu;
};

export const useSetMenu = () => {
  const { setIsMenu } = useContext(menuContext);
  return () => {
    setIsMenu();
  };
};
