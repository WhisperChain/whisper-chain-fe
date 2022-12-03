import React, { useContext, useState } from "react";

export const PublicationContext = React.createContext({
  publiction: {},
  setPublication: () => {},
});

export function usePublicationContext() {
  const { publiction, setPublication } = useContext(PublicationContext);

  return {
    publiction,
    setPublication,
  };
}

export const PubProvider = ({ children }) => {
  const [publiction, setPublication] = useState({});

  return (
    <PublicationContext.Provider
      value={{
        publiction: publiction,
        setPublication,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
};
