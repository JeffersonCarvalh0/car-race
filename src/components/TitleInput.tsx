import React from 'react';
import styled from 'styled-components';

import SlideInMotion from './SlideInMotion';

const Input = styled.input`
  border: none;
  text-align: center;
  height: 30px;
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
}
const TitleInput = ({ setValue }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <SlideInMotion>
      <Input data-testid="TitleInput" onChange={handleChange} />
    </SlideInMotion>
  );
};

export default TitleInput;
