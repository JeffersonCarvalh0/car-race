import React from 'react';
import styled from 'styled-components';

import GlobalStyle from './globalStyle';
import StartScreen from './pages/StartScreen';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = () => (
  <>
    <GlobalStyle />
    <Container>
      <StartScreen />
    </Container>
  </>
);

export default App;
