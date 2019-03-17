import React from 'react';
import styled from 'styled-components';
import Game from './Game';
import Card from './Card';
import Loader from './Loader';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function GamesList({
  loading = false, title = 'Games', games = [], autoOverflow,
}) {
  return (
    <Card autoOverflow={autoOverflow}>
      <h3>{title}</h3>
      {loading ? (
        <Div><Loader /></Div>
      ) : (
        games.map(
          g => g && <Game key={`${g.time_played}/${g.playlist}/${g.mode}/${g.username}`} data={g} />,
        )
      )}
    </Card>
  );
}

export default GamesList;
