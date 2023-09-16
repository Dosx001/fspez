import { invoke } from "@tauri-apps/api/tauri";
import { useToken } from "context/token";

function App() {
  const setToken = useToken().setToken;
  const getToken = async () => {
    const response = await invoke("token", {
      id: import.meta.env.VITE_CLIENT_ID,
      secret: import.meta.env.VITE_CLIENT_SECRET,
    });
    setToken(response as string);
  };
  return (
    <div>
      <button
        onClick={() => {
          getToken()!;
        }}
      >
        token
      </button>
    </div>
  );
}

export default App;
