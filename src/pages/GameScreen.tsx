import React, { useState } from 'react';
import styled from 'styled-components';
import useEventListener from '@use-it/event-listener';

import background from '../assets/background.gif';
import car from '../assets/car.png';

interface Props {
  position: Position;
}

export enum Position {
  Left,
  Middle,
  Right,
}

const Background = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: ${(props: Props) => {
    switch (props.position) {
      case Position.Left:
        return 'flex-start';
      case Position.Middle:
        return 'center';
      case Position.Right:
        return 'flex-end';
    }
  }};
  align-items: flex-end;
  background-image: url(${background});
  background-size: 100% 100%;
  width: 100vh;
  height: 100vh;
  transition: flex 250ms ease;
`;

const Car = styled.img`
  width: 200px;
  height: 200px;
`;

const GameScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(Position.Middle);

  const moveLeft = (position: Position) => {
    if (position !== Position.Left) {
      setCurrentPosition(position - 1);
    }
  };

  const moveRight = (position: Position) => {
    if (position !== Position.Right) {
      setCurrentPosition(position + 1);
    }
  };

  const handleControls = (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case 'A':
      case 'a': {
        setCurrentPosition(Position.Left);
        break;
      }
      case 'S':
      case 's': {
        setCurrentPosition(Position.Middle);
        break;
      }
      case 'D':
      case 'd': {
        setCurrentPosition(Position.Right);
        break;
      }
      case 'ArrowLeft': {
        moveLeft(currentPosition);
        break;
      }
      case 'ArrowRight': {
        moveRight(currentPosition);
        break;
      }
    }
  };

  useEventListener('keydown', handleControls);
  return (
    <>
      <Background position={currentPosition}>
        <Car src={car} alt="car" />
      </Background>
    </>
  );
};

export default GameScreen;
