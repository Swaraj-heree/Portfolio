import React, { createContext, useContext } from 'react';

// For this project, Tailwind handles the visual theme, 
// but this provider sets up context if dynamic theme switching is needed later.
const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);