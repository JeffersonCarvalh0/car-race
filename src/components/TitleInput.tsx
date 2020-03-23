import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  padding: 5px;
  text-align: center;
  height: 5%;
  background-color: lightGray;
  transition: background-color 250ms ease, color 250ms ease;
  color: #fff;

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
