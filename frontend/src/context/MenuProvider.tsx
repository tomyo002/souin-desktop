import React, { createContext, useContext, useState } from 'react';

type menuContextProps = {
  isMenu: boolean;
  toggle: () => void;
};
const menuContext = createContext<menuContextProps>({
  isMenu: false,
  toggle: () => {},
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
        toggle: updateIsMenu,
      }}
    >
      {children}
    </menuContext.Provider>
  );
};

export const useMenuContext = () => {
  return useContext(menuContext);
};
