import React from 'react';
import styled from 'styled-components';

const Title = styled.h4`
  text-align: center;
  color: rgb(59, 134, 255);
`;

interface Props {
  text: string;
}

const TitleHeader = ({ text }: Props) => {
  return <Title>{text}</Title>;
};

export default TitleHeader;
