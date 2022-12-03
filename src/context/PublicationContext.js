import React, { useContext, useState } from "react";

export const PublicationContext = React.createContext({
  publication: {},
  setPublication: () => {},
});

export function usePublicationContext() {
  const { publication, setPublication } = useContext(PublicationContext);

  return {
    publication,
    setPublication,
  };
}

export const PubProvider = ({ children }) => {
  const [publication, setPublication] = useState({});

  return (
    <PublicationContext.Provider
      value={{
        publication: publication,
        setPublication,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
};
