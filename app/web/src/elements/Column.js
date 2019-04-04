import styled from 'styled-components';

export default styled.div`
  default: flex;
  flex-direction: column;
  width: calc(100% - 1rem);
  margin: 0 0.5rem;

  @media (min-width: 768px) {
    width: calc(50% - 2rem);
    margin: 0 1rem;
  }
`;
