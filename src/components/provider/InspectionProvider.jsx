import React, { createContext, useState, useContext } from "react";

// Create context
const InspectionContext = createContext();

// Create a provider component
export const InspectionProvider = ({ children }) => {
  const [inspectionId, setInspectionId] = useState(null);

  return (
    <InspectionContext.Provider value={{ inspectionId, setInspectionId }}>
      {children}
    </InspectionContext.Provider>
  );
};

// Create a custom hook to use the context
export const useInspection = () => useContext(InspectionContext);
