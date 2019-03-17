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

  @media (min-width: 640px) {
    width: 25%;
  }

  h2,
  h3 {
    margin: 0;
  }
`;

const StatBox = styled.div`
  ${({ color, theme }) => {
    if (color === 'blue') {
      return `background: linear-gradient(to top right, ${theme.blue}, ${theme.lightBlue});`;
    }
    if (color === 'green') {
      return `background: linear-gradient(to top right, ${theme.turqoise}, ${theme.lightGreen});`;
    }
    if (color === 'purple') {
      return `background: linear-gradient(to top right, ${theme.purple}, ${theme.magenta});`;
    }
    return `background: linear-gradient(to top right, ${theme.pink}, ${theme.peach});`;
  }}
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 639px) {
    padding: 0.5rem 1rem;
  }
`;

const StatNumber = styled.div`
  text-align: left;
`;

function Stats({
  matchesplayed, kd, kills, placements,
}) {
  return (
    <StatsDiv>
      <StatsContainer>
        <Stat>
          <StatBox color="green">
            <StatNumber>
              <AnimatedNumber number={placements.placetop1} noDecimal />
              <h4>Victories</h4>
            </StatNumber>
            <h2>
              <i className="fas fa-trophy" />
            </h2>
          </StatBox>
        </Stat>
        <Stat>
          <StatBox color="blue">
            <StatNumber>
              <AnimatedNumber number={matchesplayed} noDecimal />
              <h4>Matches</h4>
            </StatNumber>
            <h2>
              <i className="fas fa-gamepad" />
            </h2>
          </StatBox>
        </Stat>
        <Stat>
          <StatBox color="purple">
            <StatNumber>
              <AnimatedNumber number={kills} noDecimal />
              <h4>Kills</h4>
            </StatNumber>
            <h2>
              <i className="fas fa-skull" />
            </h2>
          </StatBox>
        </Stat>
        <Stat>
          <StatBox>
            <StatNumber>
              <AnimatedNumber number={kd} format={v => v.toFixed(3)} />
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
