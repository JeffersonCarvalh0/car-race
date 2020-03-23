import React from 'react';
import styled from 'styled-components';

import CenteredText from '../components/CenteredText';

const Background = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const PauseOverlay = () => {
  return (
    <Background>
      <CenteredText>Paused</CenteredText>
    </Background>
  );
};

export default PauseOverlay;
