import React from 'react';
import Game from './Game';

function GamesList({ title = 'Games', games = [] }) {
  return (
    <div className="games__list">
      <h3>{title}</h3>
      {games.map(g => (
        <Game key={`${g.time_played} - ${g.game_type}`} data={g} />
      ))}
    </div>
  );
}

export default GamesList;
