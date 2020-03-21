import React from 'react';
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

interface StyledErrorTextProps {
  isVisible: boolean;
}
const ErrorText = styled.text`
  visibility: ${(props: StyledErrorTextProps) =>
    props.isVisible ? 'visible' : 'hidden'};
  color: red;
  font-size: 18px;
`;

interface Props {
  name: string;
  setName: (name: string) => void;
  handleClick: (event: React.MouseEvent) => void;
  errorMsg?: string;
}
const StartScreen = ({ name, setName, handleClick, errorMsg }: Props) => {
  return (
    <Container>
      <TitleHeader text="Insira seu nome(min. 3 caracteres)" />
      <TitleInput setValue={setName} />
      <ErrorText isVisible={errorMsg != null && errorMsg.length != 0}>
        {errorMsg}
      </ErrorText>
      <TitleButton
        label="Iniciar corrida"
        isVisible={name.length >= 3}
        onClick={handleClick}
      />
    </Container>
  );
};

export default StartScreen;
