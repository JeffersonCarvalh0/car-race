import React from 'react';
import styled from 'styled-components';

import car from '../assets/car.png';

export enum Position {
  Left,
  Middle,
  Right,
}

interface StyledProps {
  x: string;
}
const StyledCar = styled.img`
  content: url(${car});
  position: relative;
  margin-left: 5%;
  width: 20%;
  height: 20%;
  top: 80%;
  left: ${(props: StyledProps) => props.x};
  transition: left 100ms ease;
`;

interface Props {
  position: Position;
}
const Car = ({ position }: Props) => {
  const x = (() => {
    switch (position) {
      case Position.Left:
        return '0%';
      case Position.Middle:
        return '33.3%';
      case Position.Right:
        return '66.6%';
    }
  })();

  return <StyledCar x={x} />;
};

export default Car;
