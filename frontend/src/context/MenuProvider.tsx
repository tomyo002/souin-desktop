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
  const toggle = () => {
    setIsMenu(!isMenu);
  };

  return (
    <menuContext.Provider
      value={{
        isMenu,
        toggle,
      }}
    >
      {children}
    </menuContext.Provider>
  );
};

export const useMenuContext = () => {
  return useContext(menuContext);
};
