import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Position } from '../components/Car';
import obstacle from '../assets/obstacle.png';

interface StyledProps {
  initialX: number;
  finalX: number;
  isPaused: boolean;
  time: number;
}

const obstacleMovement = (props: StyledProps) => keyframes`
  100% {
    top: 80%;
    transform: scale(1, 1);
    left: ${`${props.finalX}%`};
  }
`;

const StyledObstacle = styled.img`
  content: url(${obstacle});
  position: absolute;
  margin-left: 5%;
  width: 20%;
  height: 20%;
  top: 40%;
  transform: scale(0.15, 0.15);
  left: ${(props: StyledProps) => props.initialX}%;
  animation: ${obstacleMovement} ${(props: StyledProps) => props.time}ms linear;
  animation-play-state: ${(props: StyledProps) =>
    props.isPaused ? 'paused' : 'running'};
`;

interface Props {
  position: Position;
  time: number;
  isPaused: boolean;
}
const Obstacle = ({ position, time, isPaused }: Props) => {
  const initialX = (() => {
    switch (position) {
      case Position.Left:
        return 30;
      case Position.Middle:
        return 33;
      case Position.Right:
        return 35;
    }
  })();

  const finalX = (() => {
    switch (position) {
      case Position.Left:
        return 0;
      case Position.Middle:
        return 33.3;
      case Position.Right:
        return 66.6;
    }
  })();

  return (
    <StyledObstacle
      initialX={initialX}
      finalX={finalX}
      time={time}
      isPaused={isPaused}
    />
  );
};

export default Obstacle;
