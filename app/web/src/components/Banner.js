import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/images/vertical-logo.png';

const Banner = styled.div`
  width: 100%;
  text-align: center;
  padding: 2.25rem 0 2rem;
  background-color: ${({ theme }) => theme.primary};

  h5 {
    color: ${({ theme }) => theme.offWhite};
    text-align: center;
    margin: 1rem 0;
    font-style: italic;
  }

  img {
    max-height: 14rem;
  }
`;

export default () => (
  <Banner>
    <Link to="/">
      <img src={logo} alt="Logo" />
    </Link>
    <h5>Detailed Fortnite Stat Tracking</h5>
  </Banner>
);
