import React from 'react';
import styled from 'styled-components';

const BannerDiv = styled.div`
  width: 100%;
  border-bottom: 3px solid ${({ theme }) => theme.border};
  text-align: center;
  padding: 2.3rem 0 2rem;

  h1 {
    color: ${({ theme }) => theme.primary};
  }
`;

function Banner() {
  return (
    <BannerDiv>
      <h1>Fortnite Dashboard</h1>
    </BannerDiv>
  );
}

export default Banner;