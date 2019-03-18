import React from 'react';
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
  justify-content: space-around;
`;

function Footer() {
  return (
    <FooterDiv>
      <FooterContainer>
        <div>
          <a href="https://fortniteapi.com/" rel="noopener noreferrer" target="_blank">
            https://fortniteapi.com
          </a>
          <a href="https://github.com/jhonnold/fndash" rel="noopener noreferrer" target="_blank">
            <i className="fab fa-github" />
          </a>
        </div>
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
      </FooterContainer>
    </FooterDiv>
  );
}

export default Footer;
