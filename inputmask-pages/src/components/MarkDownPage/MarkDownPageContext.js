import { createContext, useState, Fragment } from "react";

export const MarkDownPageContext = createContext();

export function MarkDownPageContextProvider({ children }) {
  const [Content, setContent] = useState(Fragment);

  return (
    <MarkDownPageContext.Provider
      value={{
        Content,
        setContent
      }}>
      {children}
    </MarkDownPageContext.Provider>
  );
}
