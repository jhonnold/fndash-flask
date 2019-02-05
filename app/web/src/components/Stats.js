import React from 'react';
import AnimatedNumber from './AnimatedNumber';

function Stats({
  data: {
    wins, matches, kd, kills,
  },
}) {
  return (
    <div className="stats">
      <div className="stats__container">
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
      </div>
    </div>
  );
}

export default Stats;
