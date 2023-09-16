/* @refresh reload */
import { TokenProvider } from "context/token";
import { render } from "solid-js/web";
import App from "./App";
import "./styles.scss";

render(
  () => (
    <TokenProvider>
      <App />
    </TokenProvider>
  ),
  document.getElementById("root") as HTMLElement,
);
