import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useEventListener from '@use-it/event-listener';

import background from '../assets/background.gif';
import pausedBackground from '../assets/background-paused.png';
import Car, { Position } from '../components/Car';
import CenteredText from '../components/CenteredText';
import PauseOverlay from '../components/PauseOverlay';

interface BackgroundProps {
  isPaused: boolean;
}
const Background = styled.div`
  display: flex;
  background-image: url(${(props: BackgroundProps) =>
    props.isPaused ? pausedBackground : background});
  background-size: 100% 100%;
  width: 100vh;
  height: 100vh;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const TapAreaWrapper = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  display: flex;
`;

const TapAreaRecognizer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const GameScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(Position.Middle);
  const [timerValue, setTimerValue] = useState(3);
  const [isPaused, setPaused] = useState(false);
  const shouldHandleControls = timerValue === -1 && !isPaused;

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

  const handleTap = (position: Position) => {
    return () => {
      if (shouldHandleControls) {
        setCurrentPosition(position);
      }
    };
  };

  const handleKeyboard = (event: React.KeyboardEvent): void => {
    if (shouldHandleControls) {
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

    if (timerValue === -1) {
      switch (event.key) {
        case 'Escape': {
          setPaused(!isPaused);
          break;
        }
      }
    }
  };

  useEventListener('keydown', handleKeyboard);
  useEffect(() => {
    if (timerValue >= 0) {
      setTimeout(() => setTimerValue(timerValue - 1), 1000);
    }
  }, [timerValue]);

  return (
    <>
      <Background isPaused={isPaused}>
        {timerValue >= 0 && <CenteredText>{timerValue}</CenteredText>}
        {isPaused && <PauseOverlay />}
        <Car position={currentPosition} />
        <TapAreaWrapper>
          <TapAreaRecognizer onClick={handleTap(Position.Left)} />
          <TapAreaRecognizer onClick={handleTap(Position.Middle)} />
          <TapAreaRecognizer onClick={handleTap(Position.Right)} />
        </TapAreaWrapper>
      </Background>
    </>
  );
};

export default GameScreen;
