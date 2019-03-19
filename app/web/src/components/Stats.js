import React from 'react';
import styled from 'styled-components';
import AnimatedNumber from './AnimatedNumber';
import Container from './Container';

const StatsDiv = styled.div`
  width: 100%;
`;

const StatsContainer = styled(Container)`
  padding: 1rem 0.5rem;
`;

const Stat = styled.div`
  display: flex;
  width: 50%;
  padding: 1rem;

  @media (min-width: 900px) {
    width: 25%;
  }

  h1,
  h2,
  h4 {
    margin: 0;
  }
`;

const StatBox = styled.div`
  background: ${({ theme }) => theme.primary};
  border-left: 0.0625rem solid ${({ theme, color }) => theme[color] || theme.lightBlue};
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const StatNumber = styled.div`
  text-align: left;
`;

const H1 = styled.h1``;

function Stats({
  matchesplayed, kd, kills, placements,
}) {
  return (
    <StatsDiv>
      <StatsContainer>
        <Stat>
          <StatBox color="lightGreen">
            <StatNumber>
              <AnimatedNumber component={H1} number={placements.placetop1} noDecimal />
              <h4>Victories</h4>
            </StatNumber>
            <h2>
              <i className="fas fa-trophy" />
            </h2>
          </StatBox>
        </Stat>
        <Stat>
          <StatBox color="lightGreen">
            <StatNumber>
              <AnimatedNumber component={H1} number={matchesplayed} noDecimal />
              <h4>Matches</h4>
            </StatNumber>
            <h2>
              <i className="fas fa-gamepad" />
            </h2>
          </StatBox>
        </Stat>
        <Stat>
          <StatBox color="lightGreen">
            <StatNumber>
              <AnimatedNumber component={H1} number={kills} noDecimal />
              <h4>Kills</h4>
            </StatNumber>
            <h2>
              <i className="fas fa-skull" />
            </h2>
          </StatBox>
        </Stat>
        <Stat>
          <StatBox color="lightGreen">
            <StatNumber>
              <AnimatedNumber component={H1} number={kd} format={v => v.toFixed(3)} />
              <h4>K/D</h4>
            </StatNumber>
            <h2>
              <i className="fas fa-crosshairs" />
            </h2>
          </StatBox>
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
