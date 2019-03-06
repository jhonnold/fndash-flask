import React from 'react';
import styled from 'styled-components';
import Container from './Container';

const FooterDiv = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  padding: 2rem 3rem;
  text-align: center;
  box-shadow: 0px -4px 2px -2px #131313;
  margin-top: 3rem;
  
  a {
    font-size: 16px;
    margin: 0 1rem;
    color: ${({ theme }) => theme.mediumGray}!important;
  }

  p {
    color: ${({ theme }) => theme.mediumGray};
    margin-bottom: 0;

    a {
      margin: 0 .6rem;
      color: ${({ theme }) => theme.white}!important;
    }
  }

  a:hover {
    color: ${({ theme }) => theme.primary}!important;
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
          <a href="https://fortniteapi.com/" rel="noopener noreferrer" target="_blank">fortniteapi.com</a>
          <a href="https://github.com/jhonnold/fndash" rel="noopener noreferrer" target="_blank"><i className="fab fa-github"></i></a>
        </div>
        <p>
          Created By
          <a href="https://github.com/jhonnold" rel="noopener noreferrer" target="_blank">Jay Honnold</a>
          and
          <a href="https://github.com/JackSomm" rel="noopener noreferrer" target="_blank">Jack Sommer</a>
        </p>
      </FooterContainer>
    </FooterDiv>
  );
}

export default Footer;
