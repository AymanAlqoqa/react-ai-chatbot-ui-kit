import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background: ${({ theme }) => theme.typingDot};
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite both;
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
`;

const TypingIndicator = () => (
  <Dots>
    <Dot />
    <Dot />
    <Dot />
  </Dots>
);

export default TypingIndicator;
