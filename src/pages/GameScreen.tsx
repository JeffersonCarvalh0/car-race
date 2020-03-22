import React, { useState, useEffect } from 'react';
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
  text-align: center;
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

const CountdownNumber = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 0 0 -25px;
  font-family: Retro Gaming;
  font-size: 200px;
  color: red;
`;

const GameScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(Position.Middle);
  const [timerValue, setTimerValue] = useState(3);

  const moveLeft = () => {
    if (currentPosition !== Position.Left) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const moveRight = () => {
    if (currentPosition !== Position.Right) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  const handleControls = (event: React.KeyboardEvent): void => {
    if (timerValue === -1) {
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
          moveLeft();
          break;
        }
        case 'ArrowRight': {
          moveRight();
          break;
        }
      }
    }
  };

  useEventListener('keydown', handleControls);
  useEffect(() => {
    if (timerValue >= 0) {
      setTimeout(() => setTimerValue(timerValue - 1), 1000);
    }
  }, [timerValue]);

  return (
    <>
      <Background position={currentPosition}>
        {timerValue >= 0 && <CountdownNumber>{timerValue}</CountdownNumber>}
        <Car src={car} alt="car" />
      </Background>
    </>
  );
};

export default GameScreen;
