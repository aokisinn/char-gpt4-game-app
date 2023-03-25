import React, { useRef, useEffect } from 'react';
import phaserGame from './initPhaser';

function App() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.appendChild(phaserGame.canvas);
    }
  }, []);

  return (
    <div className="App">
      <div ref={gameRef}></div>
    </div>
  );
}

export default App;
