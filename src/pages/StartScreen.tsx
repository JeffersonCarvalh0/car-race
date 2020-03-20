import React, { useState } from 'react';
import styled from 'styled-components';

import TitleHeader from '../components/TitleHeader';
import TitleInput from '../components/TitleInput';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const StartScreen = () => {
  const [name, setName] = useState('');

  return (
    <Container>
      <TitleHeader text="Insira seu nome" />
      <TitleInput setValue={setName} />
    </Container>
  );
};

export default StartScreen;
