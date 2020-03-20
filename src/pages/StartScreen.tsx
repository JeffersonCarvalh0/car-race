import React, { useState } from 'react';
import styled from 'styled-components';

import TitleHeader from '../components/TitleHeader';
import TitleInput from '../components/TitleInput';
import TitleButton from '../components/TitleButton';

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

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <Container>
      <TitleHeader text="Insira seu nome" />
      <TitleInput setValue={setName} />
      <TitleButton
        label="Iniciar corrida"
        isVisible={name.length >= 3}
        onClick={handleClick}
      />
    </Container>
  );
};

export default StartScreen;
