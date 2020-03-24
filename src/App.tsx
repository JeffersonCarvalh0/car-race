import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import GlobalStyle from './globalStyle';
import StartScreen from './pages/StartScreen';
import GameScreen from './pages/GameScreen';
import preloadAssets from './helpers/preloadAssets';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [name, setName] = useState('');
  const [hasGameStarted, setGameStarted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleStartGameClick = () => setGameStarted(!hasGameStarted);

  useEffect(() => {
    setLoading(true);
    preloadAssets(() => setLoading(false));
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={hasGameStarted ? 'gameScreen' : 'startScreen'}
              initial={{ x: 600, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -600, opacity: 0 }}
            >
              {hasGameStarted ? (
                <GameScreen />
              ) : (
                <StartScreen
                  name={name}
                  setName={setName}
                  handleStart={handleStartGameClick}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </Container>
    </>
  );
};

export default App;
