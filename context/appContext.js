// AppContext.js
import React, { useState, useMemo } from 'react';

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const appContextValue = useMemo(() => ({ isSignedIn, setIsSignedIn }), [isSignedIn]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
