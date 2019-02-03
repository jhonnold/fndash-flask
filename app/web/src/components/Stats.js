import React from 'react';

function Stats() {
  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__number-stat">
          <h2>
            <i className="fas fa-trophy" />
          </h2>
          {/* TODO - SHOW PROPER VICTORIES */}
          <h2>100</h2>
          <h3>Victories</h3>
        </div>
        <div className="stats__number-stat">
          <h2>
            <i className="fas fa-gamepad" />
          </h2>
          {/* TODO - SHOW PROPER MATCHES */}
          <h2>100</h2>
          <h3>Matches</h3>
        </div>
        <div className="stats__number-stat">
          <h2>
            <i className="fas fa-skull" />
          </h2>
          {/* TODO - SHOW PROPER KILLS */}
          <h2>1200</h2>
          <h3>Kills</h3>
        </div>
        <div className="stats__number-stat">
          <h2>
            <i className="fas fa-star-half-alt" />
          </h2>
          {/* TODO - SHOW PROPER KD */}
          <h2>1.2</h2>
          <h3>K/D</h3>
        </div>
      </div>
    </div>
  );
}

export default Stats;
