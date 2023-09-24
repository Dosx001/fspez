import { invoke } from "@tauri-apps/api/tauri";
import List from "components/List";
import MenuBar from "components/MenuBar";
import { useToken } from "context/token";

interface Token {
  access_token: string;
  refresh_token: string;
}

function App() {
  const setToken = useToken().setToken;
  const setRefresh = useToken().setRefresh;
  const auth = () => {
    location.replace(
      `https://www.reddit.com/api/v1/authorize.compact?client_id=${
        import.meta.env.VITE_CLIENT_ID
      }&response_type=code&state=200&redirect_uri=http://localhost:1420&duration=permanent&scope=*`,
    );
  };
  const init = async () => {
    if (location.search) {
      const code = new URLSearchParams(location.search).get("code");
      if (code) {
        const res: Token = await invoke("auth", {
          id: import.meta.env.VITE_CLIENT_ID,
          secret: import.meta.env.VITE_CLIENT_SECRET,
          code: code,
        });
        setToken(res.access_token);
        setRefresh(res.refresh_token);
        localStorage.setItem("token", JSON.stringify(res));
        return;
      }
    }
    const token = JSON.parse(localStorage.getItem("token")!) as Token;
    if (token) {
      setToken(token.access_token);
      setRefresh(token.refresh_token);
      return;
    }
    setToken(
      await invoke("token", {
        id: import.meta.env.VITE_CLIENT_ID,
        secret: import.meta.env.VITE_CLIENT_SECRET,
      }),
    );
  };
  init()!;
  return (
    <div>
      <button onClick={auth}>Login</button>
      <MenuBar />
      <List />
    </div>
  );
}

export default App;
