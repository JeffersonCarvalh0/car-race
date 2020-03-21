import React from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';

interface StyledProps {
  x: number;
  opacity: number;
}
const SlideOutStyle = styled.section`
  display: flex;
  flex: 1;
  transform: ${(props: StyledProps) => `translateX(${props.x}px)`};
  opacity: ${(props: StyledProps) => props.opacity};
`;

interface Props {
  children: React.ReactNode;
}
const SlideOutMotion = ({ children }: Props) => {
  return (
    <Motion
      defaultStyle={{ x: 0, opacity: 1 }}
      style={{ x: spring(-300), opacity: spring(0) }}
    >
      {({ x, opacity }) => (
        <SlideOutStyle x={x} opacity={opacity}>
          {children}
        </SlideOutStyle>
      )}
    </Motion>
  );
};

export default SlideOutMotion;
