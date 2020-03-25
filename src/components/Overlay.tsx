import React from 'react';
import styled from 'styled-components';

import CenteredText from '../components/CenteredText';

const Background = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const StaticCenteredText = styled(CenteredText)`
  position: static;
  top: 0;
  left: 0;
  transform: translate(0, 0);
`;

interface Props {
  text: string;
  children?: React.ReactNode;
}
const Overlay = ({ text, children }: Props) => {
  return (
    <Background>
      <StaticCenteredText>{text}</StaticCenteredText>
      {children}
    </Background>
  );
};

export default Overlay;
