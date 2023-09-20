import type { Accessor, ParentComponent, Setter } from "solid-js";
import { createContext, createSignal, useContext } from "solid-js";

const TokenContext = createContext<{
  token: Accessor<string>;
  setToken: Setter<string>;
  refresh: Accessor<string>;
  setRefresh: Setter<string>;
}>({
  token: () => "",
  setToken: () => {},
  refresh: () => "",
  setRefresh: () => {},
});

export const TokenProvider: ParentComponent = (props) => {
  const [token, setToken] = createSignal("");
  const [refresh, setRefresh] = createSignal("");
  return (
    <TokenContext.Provider value={{ token, setToken, refresh, setRefresh }}>
      {props.children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
