import React from 'react';
import styled from 'styled-components';

interface StyledProps {
  isVisible: boolean;
}
const Button = styled.button`
  opacity: ${(props: StyledProps) => (props.isVisible ? '1' : '0')};
  transition: opacity 250ms ease;
  margin-top: 20px;
  border-radius: 50px;
  border: none;
  width: 120px;
  height: 40px;
  background-color: rgb(59, 134, 255);
  color: white;
  font-family: Retro Gaming;

  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(2px);
  }

  &:hover {
    opacity: ${(props: StyledProps) => (props.isVisible ? '0.8' : '0')};
  }
`;

interface Props {
  isVisible: boolean;
  label: string;
  onClick: (event: React.MouseEvent) => void;
}
const TitleButton = ({ isVisible, label, onClick }: Props) => {
  return (
    <Button isVisible={isVisible} disabled={!isVisible} onClick={onClick}>
      {label}
    </Button>
  );
};

export default TitleButton;
