import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  padding: 20px 40px;
  text-align: left;
  box-shadow: 0px -4px 2px -2px #131313;
  margin-top: 60px;
  
  a {
    font-size: 14px;
    color: ${({ theme }) => theme.mediumGray}!important;
  }

  a:hover {
    color: ${({ theme }) => theme.primary}!important;
  }
  
  a:first-of-type {
    margin-right: 15px;
  }
`;

function Footer() {
  return (
    <FooterDiv>
      <a href="https://fortniteapi.com/" rel="noopener noreferrer" target="_blank">Data from fortniteapi.com</a>
      <a href="https://github.com/jhonnold/fndash" rel="noopener noreferrer" target="_blank">Source Code</a>
    </FooterDiv>
  );
}

export default Footer;
