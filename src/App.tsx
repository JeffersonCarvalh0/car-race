import React, { useState } from 'react';
import styled from 'styled-components';

import GlobalStyle from './globalStyle';
import StartScreen from './pages/StartScreen';
import SlideInMotion from './components/SlideInMotion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = () => {
  const [name, setName] = useState('');

  const handleStartGameClick = () => console.log('heya');

  return (
    <>
      <GlobalStyle />
      <Container>
        <SlideInMotion>
          <StartScreen
            name={name}
            setName={setName}
            handleClick={handleStartGameClick}
          />
        </SlideInMotion>
      </Container>
    </>
  );
};

export default App;
