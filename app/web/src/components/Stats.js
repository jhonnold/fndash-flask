import React from 'react';

function Stats(props) {
  return (
    <div class="stats">
    <div class="stats__container">
      <div class="stats__number-stat">
        <h2><i class="fas fa-trophy"></i></h2>
        {/* TODO - SHOW PROPER VICTORIES */}
        <h2>100</h2>
        <h3>Victories</h3>
      </div>
      <div class="stats__number-stat">
        <h2><i class="fas fa-gamepad"></i></h2>
        {/* TODO - SHOW PROPER MATCHES */}
        <h2>100</h2>
        <h3>Matches</h3>
      </div>
      <div class="stats__number-stat">
        <h2><i class="fas fa-skull"></i></h2>
        {/* TODO - SHOW PROPER KILLS */}
        <h2>1200</h2>
        <h3>Kills</h3>
      </div>
      <div class="stats__number-stat">
        <h2><i class="fas fa-star-half-alt"></i></h2>
        {/* TODO - SHOW PROPER KD */}
        <h2>1.2</h2>
        <h3>K/D</h3>
      </div>
    </div>
  </div>
  );
}

export default Stats;