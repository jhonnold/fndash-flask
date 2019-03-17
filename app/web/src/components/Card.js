import styled from 'styled-components';

export default styled.div`
  background-color: ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 1rem;
  margin-bottom: 2rem;
  ${({ autoOverflow }) => (autoOverflow ? 'overflow: auto;' : '')}

  h3 {
    margin-bottom: 1rem;
  }
`;
