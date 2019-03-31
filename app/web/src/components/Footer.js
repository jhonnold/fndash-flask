import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from './Container';

const FooterDiv = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  padding: 2rem 3rem;
  text-align: center;

  a {
    font-size: 16px;
    margin: 0 1rem;
    color: ${({ theme }) => theme.white};
  }

  p {
    color: ${({ theme }) => theme.offWhite};
    margin-bottom: 0;

    a {
      margin: 0 0.4rem;
      color: ${({ theme }) => theme.white};
    }
  }

  a:hover {
    color: ${({ theme }) => theme.lightGreen};
  }
`;

const FooterContainer = styled(Container)`
  text-align: center;

  h6 {
    color: ${({ theme }) => theme.offWhite};
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    @media (min-width: 640px) {
      flex: 1;
      width: auto;
    }
  }
`;

function Footer() {
  return (
    <FooterDiv>
      <FooterContainer>
        <div>
          <h6>Pages</h6>
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/about">About Us</Link>
          </p>
          <p>
            <Link to="/signup">Sign Up</Link>
          </p>
          <p>
            <a href="https://github.com/jhonnold/fndash" rel="noopener noreferrer" target="_blank">
              <i className="fab fa-github" /> Github
            </a>
          </p>
        </div>
        <div>
          <div>
            <p>
              Created By
              <a href="https://github.com/jhonnold" rel="noopener noreferrer" target="_blank">
                Jay Honnold
              </a>
              and
              <a href="https://github.com/JackSomm" rel="noopener noreferrer" target="_blank">
                Jack Sommer
              </a>
            </p>
          </div>
          <div>
            <p>
              Powered By
              <a href="https://fortniteapi.com/" rel="noopener noreferrer" target="_blank">
                Fornite Api
              </a>
            </p>
            {/**/}
          </div>
        </div>
      </FooterContainer>
    </FooterDiv>
  );
}

export default Footer;
