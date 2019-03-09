import React from 'react';
import styled from 'styled-components';
import Container from './Container';

const Wrap = styled.div`
  background-color: ${({ theme }) => theme.primary};
`;

const SignUpContainer = styled(Container)`
  padding: 1rem 0;
  justify-content: center;
  align-items: center;

  span {
    font-size: 18px;
    font-weight: 500;
    margin-right: 2rem;
  }

  input {
    border-radius: 4px;
    height: 2rem;
    width: 18rem;
    border: none;
  }
`;

function SignUp() {
  return (
    <React.Fragment>
      <Wrap>
        <SignUpContainer>
          <span>Interested in signing up? Enter your Fortnite User ID!</span>
          <input name="user_id" value="" placeholder="Enter User ID..." />
        </SignUpContainer>
      </Wrap>
    </React.Fragment>
  );
}

export default SignUp;
