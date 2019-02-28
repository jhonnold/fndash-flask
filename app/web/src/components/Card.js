import styled from 'styled-components';

export default styled.div`
  background-color: ${({ theme }) => theme.cardBack};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 1rem;
  margin-bottom: 1rem;
`;
