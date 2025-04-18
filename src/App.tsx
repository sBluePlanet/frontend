import { useState } from "react";
import StartView from "./views/StartView";
import PlayView from "./views/PlayView";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started ? (
        <StartView onStart={() => setStarted(true)} />
      ) : (
        <PlayView />
      )}
    </>
  );
}

export default App;
