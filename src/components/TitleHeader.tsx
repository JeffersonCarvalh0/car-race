import React from 'react';
import styled from 'styled-components';

import SlideInMotion from './SlideInMotion';

const Title = styled.h1`
  text-align: center;
  color: rgb(59, 134, 255);
`;

interface Props {
  text: string;
}

const TitleHeader = ({ text }: Props) => {
  return (
    <SlideInMotion>
      <Title>{text}</Title>
    </SlideInMotion>
  );
};

export default TitleHeader;
