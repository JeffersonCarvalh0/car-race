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
  const [newObstacleFlag, setNewObstacleFlag] = useState(true);
  const [obstacleTimespan, setObstacleTimespan] = useState(1500);
  const [isTurboActive, setTurboActive] = useState(false);
  const obstacleTimer = useTimer();
  const turboTimer = useTimer();
  const firstRender = useRef(true);

  const shouldHandleControls =
    countdownValue === -1 && !isPaused && !hasCrashed;
  const shouldHandleUI = countdownValue === -1 && !hasCrashed;
  const didCrash =
    countdownValue === -1 &&
    !firstRender.current &&
    obstacleTimer.time >= obstacleTimespan - 200 &&
    currentPosition === currentObstaclePosition;

  const togglePaused = () => {
    if (shouldHandleUI) {
      isPaused ? obstacleTimer.resume() : obstacleTimer.pause();
      isPaused ? turboTimer.resume() : turboTimer.pause();
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

  const turbo = () => {
    if (turboTimer.time >= 5000) {
      setTurboActive(true);
      turboTimer.pause();
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
    setCountdownValue(3);
    firstRender.current = true;
    obstacleTimer.reset();
    obstacleTimer.resume();
    turboTimer.reset();
    turboTimer.resume();
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
        case 'W':
        case 'w':
        case 'ArrowUp': {
          turbo();
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
    if (firstRender.current) {
      turboTimer.reset();
      turboTimer.resume();
    }
  }, [firstRender, turboTimer]);

  useEffect(() => {
    if (countdownValue >= 0) {
      setTimeout(() => setCountdownValue(prev => prev - 1), 1000);
    }
  }, [countdownValue]);

  useEffect(() => {
    if (isTurboActive) {
      setObstacleTimespan(750);
      setTimeout(() => {
        setObstacleTimespan(1500);
        setTurboActive(false);
        turboTimer.reset();
        turboTimer.resume();
      }, 3000);
    }
  }, [isTurboActive, obstacleTimespan, turboTimer]);

  useEffect(() => {
    if (didCrash) {
      setCrashed(true);
      obstacleTimer.pause();
      turboTimer.pause();
    }
  }, [didCrash, obstacleTimer, turboTimer]);

  useEffect(() => {
    if (countdownValue === -1 && obstacleTimer.time >= obstacleTimespan) {
      if (firstRender.current) firstRender.current = false;
      setCurrentObstaclePosition(getRandomPosition());
      setNewObstacleFlag(!newObstacleFlag);
      obstacleTimer.reset();
    }
  }, [
    obstacleTimer,
    obstacleTimespan,
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
