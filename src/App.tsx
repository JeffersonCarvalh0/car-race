import React, { useState } from 'react';
import styled from 'styled-components';

import GlobalStyle from './globalStyle';
import StartScreen from './pages/StartScreen';
import SlideInMotion from './components/SlideInMotion';
import SlideOutMotion from './components/SlideOutMotion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = () => {
  const [name, setName] = useState('');
  const [hasGameStarted, setGameStarted] = useState(false);
  const handleStartGameClick = () => setGameStarted(!hasGameStarted);

  const startScreen = (
    <StartScreen
      name={name}
      setName={setName}
      handleClick={handleStartGameClick}
    />
  );

  return (
    <>
      <GlobalStyle />
      <Container>
        {!hasGameStarted ? (
          <SlideInMotion>{startScreen}</SlideInMotion>
        ) : (
          <SlideOutMotion>{startScreen}</SlideOutMotion>
        )}
      </Container>
    </>
  );
};

export default App;
