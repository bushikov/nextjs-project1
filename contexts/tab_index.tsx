import { createContext, useState } from "react";

export const TabIndexContext = createContext([]);

export const TabIndexProvider = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <TabIndexContext.Provider value={[tabIndex, setTabIndex]}>
      {children}
    </TabIndexContext.Provider>
  );
};
