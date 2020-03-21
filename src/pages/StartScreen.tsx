import React from 'react';
import styled from 'styled-components';

import TitleHeader from '../components/TitleHeader';
import TitleInput from '../components/TitleInput';
import TitleButton from '../components/TitleButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  handleStart: (event: React.MouseEvent | React.KeyboardEvent) => void;
  errorMsg?: string;
}
const StartScreen = ({ name, setName, handleStart, errorMsg }: Props) => {
  return (
    <Container>
      <TitleHeader text="Insira seu nome(min. 3 caracteres)" />
      <TitleInput
        setValue={setName}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === 'Enter' && name.length >= 3) {
            handleStart(event);
          }
        }}
      />
      <ErrorText
        isVisible={
          errorMsg !== null && errorMsg !== undefined && errorMsg.length !== 0
        }
      >
        {errorMsg}
      </ErrorText>
      <TitleButton
        label="Iniciar corrida"
        isVisible={name.length >= 3}
        onClick={handleStart}
      />
    </Container>
  );
};

export default StartScreen;
