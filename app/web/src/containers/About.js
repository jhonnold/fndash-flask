import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Container from '../components/Container';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const FlexContainer = styled(Container)`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 50rem;
`;

const H2 = styled.h2`
  margin: 1rem 0 2rem;
  width: 100%;
  text-align: center;
`;

const P = styled.p`
  color: ${({ theme }) => theme.offWhite};

  em {
    color: ${({ theme }) => theme.lightGreen};
  }
`;

export default () => (
  <React.Fragment>
    <Helmet><title>FN Dash - About Us</title></Helmet>
    <Banner />
    <FlexContainer>
      <H2>About Us</H2>
      <P>
        FN Dash is a fortnite tracking solution with the ultimate goal of <em>detailed</em> and{' '}
        <em>accurate</em> stat tracking. FN Dash tracks <em>all stats:</em> games, kills,
        matches, placements, and players outlived. It also tracks all different game playlists
        as well - the standard modes (including tournaments), LTMs, and large-team LTMs.
        <br />
        <br />
        What makes really sets apart FN Dash is its ability to track all of this data{' '}
        <em>without having any page open.</em> Since we don{"'"} track everyone, we are able
        to track the players who have signed up without interruption.
        <br />
        <br />
        Signing up is entirely free, FN Dash doesn{"'"}t even ask for your email, simply just your{' '}
        ingame name. If you are ready to signup and join the many other FN Dash players in
        their endeavor to improve, <Link to="/">click here.</Link>
      </P>
    </FlexContainer>
    <Footer />
  </React.Fragment>
);
