import React from 'react';
import styled from 'styled-components';
import { pSBC } from '../assets/constants/colors';

const Wrap = styled.div`
  position: relative;
  background-color: ${({ theme }) => pSBC(-0.125, theme.primary, false, true)};
`;

const CloseButton = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  height: 1rem;
  width: 1rem;
  cursor: pointer;

  i {
    font-size: 1rem;
    color: ${({ theme }) => theme.white};

    &:hover {
      color: ${({ theme }) => theme.pink};
    }
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Button = styled.button`
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.white};
  border-radius: 0.25rem;
  padding: 0.125rem 0.5rem;
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.white};
  }
`;

const Span = styled.span`
  font-weight: 400;
  margin: 0.5rem;
  text-align: center;

  a {
    color: ${({ theme }) => theme.pink};
    margin: 0 0.25rem;

    &:hover {
      color: ${({ theme }) => theme.pink};
      text-decoration: underline;
    }
  }
`;

const Error = styled.span`
  font-weight: 400;
  margin: 0.5rem;
  text-align: center;
  color: red;
`;

const Input = styled.input`
  border-radius: 0.25rem;
  width: 20rem;
  border: none;
  margin: 0 1rem;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.white};

  @media (max-width: 640px) {
    width: 15rem;
  }
`;

const Row = styled.div`
  display: flex;
`;

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
    };
  }

  render() {
    const { onClose, onSubmit, users } = this.props;
    const { uid } = this.state;

    return (
      <React.Fragment>
        <Wrap>
          <CloseButton onClick={onClose}>
            <i className="fas fa-times" />
          </CloseButton>
          {!users.signedUp ? (
            <SignUpContainer>
              {!users.error ? (
                <Span>
                  Interested in signing up? Enter your
                  <a href="https://imgur.com/a/SmzoIIY" target="_blank" rel="noreferrer noopener">
                    Epic Account ID!
                  </a>
                </Span>
              ) : (
                <Error>{users.error}</Error>
              )}
              <Row>
                <Input
                  name="user_id"
                  value={uid}
                  onChange={({ target }) => this.setState({ uid: target.value })}
                  placeholder="Enter User ID..."
                />
                <Button onClick={() => onSubmit(uid)}>Join</Button>
              </Row>
            </SignUpContainer>
          ) : (
            <SignUpContainer>
              <Span>
                Thanks for Signing Up! If you refresh, your name should appear in the list of
                options. Please wait a minute for your stats to be loaded.
              </Span>
            </SignUpContainer>
          )}
        </Wrap>
      </React.Fragment>
    );
  }
}

export default SignUp;
