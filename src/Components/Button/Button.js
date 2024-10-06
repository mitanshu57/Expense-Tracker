import React from 'react';
import styled from 'styled-components';

function Button({ name, icon, onClick, bg, bPad, color, bRad, iColor, hColor }) {
  return (
    <ButtonStyled
      bg={bg}
      bPad={bPad}
      bRad={bRad}
      color={color}
      iColor={iColor}
      hColor={hColor}
      onClick={onClick}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ bg }) => bg};
  padding: ${({ bPad }) => bPad};
  border-radius: ${({ bRad }) => bRad};
  color: ${({ color }) => color};
  cursor: pointer;

  svg {
    fill: ${({ iColor }) => iColor};
  }

  &:hover {
    background: ${({ hColor }) => hColor};
  }
`;

export default Button;
