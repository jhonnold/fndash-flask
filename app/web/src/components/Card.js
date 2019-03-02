import styled from 'styled-components';

export default styled.div`
  background-color: ${({ theme }) => theme.cardBack};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  ${({ autoOverflow }) => (autoOverflow ? 'overflow: auto;' : '')}
`;
