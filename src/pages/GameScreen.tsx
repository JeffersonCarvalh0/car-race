import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import useEventListener from '@use-it/event-listener';

import background from '../assets/background.gif';
import pausedBackground from '../assets/background-paused.png';
import Car, { Position } from '../components/Car';
import CenteredText from '../components/CenteredText';
import Overlay from '../components/Overlay';
import Obstacle from '../components/Obstacle';
import TitleButton from '../components/TitleButton';

import useTimer from '../helpers/useTimer';

interface BackgroundProps {
  frozenBackground: boolean;
}
const Background = styled.div`
  display: flex;
  background-image: url(${(props: BackgroundProps) =>
    props.frozenBackground ? pausedBackground : background});
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const PauseButton = styled.button`
  color: red;
  margin: 20px 20px 0 0;
  background-color: transparent;
  border: none;
  font-size: 3rem;
  z-index: 2;

  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(2px);
  }
`;

const getRandomPosition = (): Position => Math.floor((Math.random() * 100) % 3);

const GameScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(Position.Middle);
  const [countdownValue, setCountdownValue] = useState(3);
  const [isPaused, setPaused] = useState(false);
  const [hasCrashed, setCrashed] = useState(false);
  const [currentObstaclePosition, setCurrentObstaclePosition] = useState(
    getRandomPosition,
  );
  const timer = useTimer();
  const [newObstacleFlag, setNewObstacleFlag] = useState(true);
  const firstRender = useRef(true);

  const shouldHandleControls =
    countdownValue === -1 && !isPaused && !hasCrashed;
  const shouldHandleUI = countdownValue === -1 && !hasCrashed;
  const obstacleTimespan = 1500;
  const didCrash =
    countdownValue === -1 &&
    !firstRender.current &&
    timer.time >= obstacleTimespan - 200 &&
    currentPosition === currentObstaclePosition;

  const togglePaused = () => {
    if (shouldHandleUI) {
      isPaused ? timer.resume() : timer.pause();
      setPaused(!isPaused);
    }
  };

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

  const reset = () => {
    setCrashed(false);
    setCurrentPosition(Position.Middle);
    timer.reset();
    setCountdownValue(3);
    firstRender.current = true;
    timer.resume();
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

    if (shouldHandleUI) {
      switch (event.key) {
        case 'Escape': {
          togglePaused();
          break;
        }
      }
    }
  };

  useEventListener('keydown', handleKeyboard);
  useEffect(() => {
    if (countdownValue >= 0) {
      setTimeout(() => setCountdownValue(countdownValue - 1), 1000);
    }
  }, [countdownValue]);

  useEffect(() => {
    if (didCrash) {
      setCrashed(true);
      timer.pause();
    }

    if (countdownValue === -1 && timer.time >= obstacleTimespan) {
      if (firstRender.current) firstRender.current = false;
      setCurrentObstaclePosition(getRandomPosition());
      setNewObstacleFlag(!newObstacleFlag);
      timer.reset();
    }
  }, [
    timer,
    didCrash,
    countdownValue,
    newObstacleFlag,
    currentObstaclePosition,
    currentPosition,
  ]);

  return (
    <>
      <Background frozenBackground={isPaused || hasCrashed}>
        {countdownValue >= 0 && <CenteredText>{countdownValue}</CenteredText>}
        {isPaused && <Overlay text="Paused" />}
        {hasCrashed && (
          <Overlay text="Game Over">
            <TitleButton isVisible label="Tentar novamente" onClick={reset} />
          </Overlay>
        )}
        <TapAreaWrapper>
          {countdownValue === -1 && (
            <Obstacle
              position={currentObstaclePosition}
              time={obstacleTimespan}
              key={`${newObstacleFlag}`}
              isPaused={isPaused || hasCrashed}
            />
          )}
          <TapAreaRecognizer onClick={handleTap(Position.Left)} />
          <TapAreaRecognizer onClick={handleTap(Position.Middle)} />
          <TapAreaRecognizer onClick={handleTap(Position.Right)}>
            <PauseButton
              onClick={e => {
                e.stopPropagation();
                togglePaused();
              }}
            >
              ||
            </PauseButton>
          </TapAreaRecognizer>
        </TapAreaWrapper>
        <Car position={currentPosition} />
      </Background>
    </>
  );
};

export default GameScreen;
