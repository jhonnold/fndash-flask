import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { actions as userActions } from '../ducks/users';
import Banner from '../components/Banner';
import Container from '../components/Container';
import Column from '../components/Column';
import Footer from '../components/Footer';

const HomeContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const HomeColumn = styled(Column)`
  max-width: 25rem;
  width: 100%;
  align-items: center;
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  outline: none;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.offWhite};
  }
`;

const Div = styled.div`
  width: 100%;
`;

const H6 = styled.h6`
  color: ${({ theme }) => theme.offWhite};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.offWhite};
  opacity: 0.1;
  margin: 1rem 0 3rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.white};
  border-radius: 0.25rem;
  background: ${({ theme }) => `linear-gradient(to top right, ${theme.purple}, ${theme.magenta})`};
  font-weight: bold;
  margin: 2rem 1rem;
  cursor: pointer;
`;

function SignUpPage({ register }) {
  const [username, setUsername] = useState('');

  return (
    <React.Fragment>
      <Helmet>
        <title>Sign Up - FN Dash</title>
      </Helmet>
      <Banner />
      <HomeContainer>
        <HomeColumn>
          <h2>Sign Up</h2>
          <Divider />
          <Div>
            <H6>In-game Username</H6>
            <Input
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              onKeyPress={({ key }) => {
                if (key === 'Enter') register(username);
              }}
              placeholder="Enter your username..."
            />
          </Div>
          <Button onClick={() => register(username)}>Track my Stats!</Button>
        </HomeColumn>
      </HomeContainer>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = dispatch => ({
  register: username => dispatch(userActions.requestJoinUser(username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpPage);
