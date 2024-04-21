import React from 'react';

export const Body: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="px-4 py-8">{children}</div>
);
