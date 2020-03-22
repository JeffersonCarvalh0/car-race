import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useEventListener from '@use-it/event-listener';

import background from '../assets/background.gif';
import Car from '../components/Car';

export enum Position {
  Left,
  Middle,
  Right,
}

const Background = styled.div`
  background-image: url(${background});
  background-size: 100% 100%;
  width: 100vh;
  height: 100vh;
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
      <Background>
        {timerValue >= 0 && <CountdownNumber>{timerValue}</CountdownNumber>}
        <Car position={currentPosition} />
      </Background>
    </>
  );
};

export default GameScreen;
