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
`;

const Button = styled.button`
  color: ${({ theme }) => theme.white};
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: ${({ theme }) => theme.black};
  }
`;

const Span = styled.span`
  font-size: 18px;
  margin-right: 2rem;
`;

const Input = styled.input`
  border-radius: 4px;
  height: 2rem;
  width: 18rem;
  border: none;
  margin-right: 1rem;
`;

function SignUp() {
  return (
    <React.Fragment>
      <Wrap>
        <SignUpContainer>
          <Span>Interested in signing up? Enter your Fortnite User ID!</Span>
          <Input name="user_id" value="" placeholder="Enter User ID..." />
          <Button type="submit">Join</Button>
        </SignUpContainer>
      </Wrap>
    </React.Fragment>
  );
}

export default SignUp;
