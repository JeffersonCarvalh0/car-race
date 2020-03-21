import React from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';

interface StyledProps {
  x: number;
  opacity: number;
}
const SlideInStyle = styled.section`
  display: flex;
  flex: 1;
  transform: ${(props: StyledProps) => `translateX(${props.x}px)`};
  opacity: ${(props: StyledProps) => props.opacity};
`;

interface Props {
  children: React.ReactNode;
}
const SlideInMotion = ({ children }: Props) => {
  return (
    <Motion
      defaultStyle={{ x: -300, opacity: 0 }}
      style={{ x: spring(0), opacity: spring(1) }}
    >
      {({ x, opacity }) => (
        <SlideInStyle x={x} opacity={opacity}>
          {children}
        </SlideInStyle>
      )}
    </Motion>
  );
};

export default SlideInMotion;
