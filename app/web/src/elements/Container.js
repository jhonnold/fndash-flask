import styled from 'styled-components';

export default styled.div`
  max-width: ${({ width }) => width || 74}rem;
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem;

  @media (min-width: 768px) {
    padding: 1rem;
  }
`;
