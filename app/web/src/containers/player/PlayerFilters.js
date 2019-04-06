import React from 'react';
import styled from 'styled-components';
import { Container, Row, Column, SingleSelect } from '../../elements';

const FiltersWrapper = styled.div`
  background-color: ${({ theme }) => theme.offPrimary};
`;

const FilterColumn = styled(Column)`
  width: calc(50% - 1rem);
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    width: calc(25% - 2rem);
  }
`;

const FilterLabel = styled.h6`
  color: ${({ theme }) => theme.offWhite};
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;

const PlayerFilters = () => {
  return (
    <FiltersWrapper>
      <Container>
        <Row>
          <FilterColumn>
            <FilterLabel>Input</FilterLabel>
            <SingleSelect />
          </FilterColumn>
          <FilterColumn>
            <FilterLabel>Playlists</FilterLabel>
            <SingleSelect />
          </FilterColumn>
          <FilterColumn>
            <FilterLabel>Mode</FilterLabel>
            <SingleSelect />
          </FilterColumn>
          <FilterColumn>
            <FilterLabel>Season</FilterLabel>
            <SingleSelect />
          </FilterColumn>
        </Row>
      </Container>
    </FiltersWrapper>
  );
};

export default PlayerFilters;