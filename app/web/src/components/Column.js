import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;

  @media (min-width: 640px) {
    width: 50%;
  }
`;
