import type { Accessor, ParentComponent, Setter } from "solid-js";
import { createContext, createSignal, useContext } from "solid-js";

const TokenContext = createContext<{
  token: Accessor<string>;
  setToken: Setter<string>;
}>({ token: () => "", setToken: () => { } });

export const TokenProvider: ParentComponent = (props) => {
  const [token, setToken] = createSignal("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
