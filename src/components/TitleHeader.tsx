import React from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';

interface StyledProps {
  x: number;
  opacity: number;
}

const Title = styled.h1`
  flex: 1;
  transform: ${(props: StyledProps) => `translateX(${props.x}px)`};
  opacity: ${(props: StyledProps) => props.opacity};
  text-align: center;
  color: rgb(59, 134, 255);
`;

interface Props {
  text: string;
}

const TitleHeader = (props: Props) => {
  return (
    <Motion
      defaultStyle={{ x: -300, opacity: 0 }}
      style={{ x: spring(0), opacity: spring(1) }}
    >
      {values => (
        <Title x={values.x} opacity={values.opacity}>
          {props.text}
        </Title>
      )}
    </Motion>
  );
};

export default TitleHeader;
