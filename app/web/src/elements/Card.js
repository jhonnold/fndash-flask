import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const CardTitle = styled.h5`
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardBase = styled.div`
  background-color: ${({ theme }) => theme.primary};
  ${({ theme, borderColor }) => borderColor && `border-left: 1px solid ${theme[borderColor] || theme.lightGreen};`}
  border-radius: 0.5rem;
  padding: 1rem;
`;

export default ({ children, title, ...rest }) => (
  <CardWrapper>
    {title && <CardTitle>{title}</CardTitle>}
    <CardBase {...rest}>{children}</CardBase>
  </CardWrapper>
);
