import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  text-align: center;
  height: 30px;
  font-family: Retro Gaming;
  font-size: 16px;
  background-color: lightGray;
  transition: background-color 250ms ease, color 250ms ease;
  color: #fff;
  border-radius: 50px;

  &:focus {
    outline: none;
    background-color: whiteSmoke;
    color: #000;
  }
`;

interface Props {
  setValue: Function;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}
const TitleInput = ({ setValue, onKeyDown }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <Input
      data-testid="TitleInput"
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default TitleInput;
