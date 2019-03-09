import React from 'react';
import Game from './Game';
import Card from './Card';

function GamesList({ title = 'Games', games = [], autoOverflow }) {
  return (
    <Card autoOverflow={autoOverflow}>
      <h3>{title}</h3>
      {games.map(g => g && <Game key={`${g.time_played}/${g.playlist}/${g.mode}/${g.username}`} data={g} />)}
    </Card>
  );
}

export default GamesList;
