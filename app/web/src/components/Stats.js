import React from 'react';
import styled from 'styled-components';
import AnimatedNumber from './AnimatedNumber';
import Container from './Container';
import { colors } from '../assets/constants/colors';

const StatsDiv = styled.div`
  width: 100%;
  background-color: ${colors.black};
  box-shadow: 0px 4px 2px -2px ${colors.black};
`;

function Stats({
  data: {
    wins, matches, kd, kills,
  },
}) {
  return (
    <StatsDiv>
      <Container>
        <div className="stats__number-stat">
          <h2>
            <i className="fas fa-trophy" />
          </h2>
          <AnimatedNumber number={wins} noDecimal />
          <h3>Victories</h3>
        </div>
        <div className="stats__number-stat">
          <h2>
            <i className="fas fa-gamepad" />
          </h2>
          <AnimatedNumber number={matches} noDecimal />
          <h3>Matches</h3>
        </div>
        <div className="stats__number-stat">
          <h2>
            <i className="fas fa-skull" />
          </h2>
          <AnimatedNumber number={kills} noDecimal />
          <h3>Kills</h3>
        </div>
        <div className="stats__number-stat">
          <h2>
            <i className="fas fa-crosshairs" />
          </h2>
          <AnimatedNumber number={kd} format={v => v.toFixed(3)} />
          <h3>K/D</h3>
        </div>
      </Container>
    </StatsDiv>
  );
}

export default Stats;
