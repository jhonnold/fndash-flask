import React from 'react';
import styled from 'styled-components';
import AnimatedNumber from './AnimatedNumber';
import Container from './Container';

const StatsDiv = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  box-shadow: 0px 4px 2px -2px ${({ theme }) => theme.black};
`;

const StatsContainer = styled(Container)`
  padding: 0.5rem;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1rem;
  text-align: center;
  border-right: 1px solid ${({ theme }) => theme.border};

  @media (min-width: 640px) {
    width: 25%;
  }

  @media (max-width: 639px) {
    &:nth-of-type(2) {
      border: none;
    }
  }

  &:last-of-type {
    border: none;
  }

  h2:last-of-type {
    color: ${({ theme }) => theme.primary};
  }
`;

function Stats({
  matchesplayed, kd, kills, placements,
}) {
  return (
    <StatsDiv>
      <StatsContainer>
        <Stat>
          <h2>
            <i className="fas fa-trophy" />
          </h2>
          <AnimatedNumber number={placements.placetop1} noDecimal />
          <h3>Victories</h3>
        </Stat>
        <Stat>
          <h2>
            <i className="fas fa-gamepad" />
          </h2>
          <AnimatedNumber number={matchesplayed} noDecimal />
          <h3>Matches</h3>
        </Stat>
        <Stat>
          <h2>
            <i className="fas fa-skull" />
          </h2>
          <AnimatedNumber number={kills} noDecimal />
          <h3>Kills</h3>
        </Stat>
        <Stat>
          <h2>
            <i className="fas fa-crosshairs" />
          </h2>
          <AnimatedNumber number={kd} format={v => v.toFixed(3)} />
          <h3>K/D</h3>
        </Stat>
      </StatsContainer>
    </StatsDiv>
  );
}

Stats.defaultProps = {
  matchesplayed: 0,
  kd: 0,
  kills: 0,
  placements: {
    placetop1: 0,
  },
};

export default Stats;
