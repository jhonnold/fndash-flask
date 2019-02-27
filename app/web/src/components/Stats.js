import React from 'react';
import styled from 'styled-components';
import AnimatedNumber from './AnimatedNumber';
import Container from './Container';
import { colors, toRGB } from '../assets/constants/colors';

const StatsDiv = styled.div`
  width: 100%;
  background-color: ${colors.black};
  box-shadow: 0px 4px 2px -2px ${colors.black};
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1rem;
  text-align: center;
  border-right: 1px solid ${toRGB(colors.white, 0.125)};

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
    color: ${colors.primary};
  }
`;

function Stats({
  data: {
    wins, matches, kd, kills,
  },
}) {
  return (
    <StatsDiv>
      <Container>
        <Stat>
          <h2>
            <i className="fas fa-trophy" />
          </h2>
          <AnimatedNumber number={wins} noDecimal />
          <h3>Victories</h3>
        </Stat>
        <Stat>
          <h2>
            <i className="fas fa-gamepad" />
          </h2>
          <AnimatedNumber number={matches} noDecimal />
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
      </Container>
    </StatsDiv>
  );
}

export default Stats;
