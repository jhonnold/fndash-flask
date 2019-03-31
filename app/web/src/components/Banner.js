import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from './Container';
import logo from '../assets/images/vertical-logo.png';

const Banner = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  background-color: ${({ theme }) => theme.primary};

  h5 {
    color: ${({ theme }) => theme.offWhite};
    text-align: center;
    font-style: italic;
  }

  img {
    height: 12rem;
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 750px;
  margin: 1rem auto;
  background-color: ${({ theme }) => theme.offWhite};
  height: 1px;
  opacity: 0.1;
`;

const Div = styled(Container)`
  display: flex;
  justify-content: space-around;
  max-width: 750px;
`;

const A = styled(Link)`
  color: ${({ theme, selected }) => (selected ? theme.white : theme.offWhite)};
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
`;

export default () => {
  const { pathname } = window.location;

  return (
    <Banner>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <h5>Detailed Fortnite Stat Tracking</h5>
      <Divider />
      <Div>
        <A to="/" selected={pathname === '/'}>
          Home
        </A>
        <A to="/signup" selected={pathname === '/signup'}>
          Sign Up
        </A>
        <A to="/about" selected={pathname === '/about'}>
          About
        </A>
      </Div>
    </Banner>
  );
};
