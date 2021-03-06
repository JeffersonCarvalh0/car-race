import React from 'react';
import styled from 'styled-components';

interface StyledProps {
  isVisible: boolean;
}
const Button = styled.button`
  opacity: ${(props: StyledProps) => (props.isVisible ? '1' : '0')};
  transition: opacity 250ms ease;
  margin-top: 20px;
  padding: 10px;
  border: none;
  background-color: rgb(59, 134, 255);
  color: white;

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
