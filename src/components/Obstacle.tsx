import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Position } from '../components/Car';
import obstacle from '../assets/obstacle.png';

interface StyledProps {
  y: number;
  x: number;
  scale: number;
  time: number;
}
const StyledObstacle = styled.img`
  content: url(${obstacle});
  position: relative;
  margin-left: 5%;
  width: 20%;
  height: 20%;
  top: ${(props: StyledProps) => `${props.y}%`};
  left: ${(props: StyledProps) => `${props.x}%`};
  transform: scale(${(props: StyledProps) => `${props.scale}, ${props.scale}`});
  transition: ${(props: StyledProps) =>
    `top ${props.time}ms linear, left ${props.time}ms linear, transform ${props.time}ms linear`};
`;

const getInitialX = (position: Position) => {
  switch (position) {
    case Position.Left:
      return 30;
    case Position.Middle:
      return 33;
    case Position.Right:
      return 35;
  }
};

const getFinalX = (position: Position) => {
  switch (position) {
    case Position.Left:
      return 0;
    case Position.Middle:
      return 33.3;
    case Position.Right:
      return 66.6;
  }
};

const initialValues = {
  y: 40,
  scale: 0.15,
};

const finalValues = {
  y: 80,
  scale: 1,
};

interface Props {
  position: Position;
  time: number;
}
const Obstacle = ({ position, time }: Props) => {
  /* based on the velocity, I can calculate the position of the obstacle in any
   * given time. Therefore, I just need to know how much time should be elapsed
   * since the object was created and the current player's position to
   * if there is a collision or not.*/

  const [y, setY] = useState(initialValues.y);
  const [x, setX] = useState(getInitialX(position));
  const [scale, setScale] = useState(initialValues.scale);

  useEffect(() => {
    setY(finalValues.y);
    setX(getFinalX(position));
    setScale(finalValues.scale);
  }, [position]);

  return <StyledObstacle y={y} x={x} scale={scale} time={time} />;
};

export default Obstacle;
