import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SocketModule from "./SocketComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div></div>
      <h1>Socket </h1>
      <SocketModule />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
