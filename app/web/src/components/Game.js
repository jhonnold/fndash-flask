import React from 'react';
import moment from 'moment-timezone';

function Game({
  data: {
    game_type: gameType, time_played: timePlayed, kills, placement,
  },
}) {
  return (
    <div className="games__game">
      <div className="games__top">
        <h5>{gameType} Match</h5>
        <p>{moment(timePlayed).format('MMM Do - h:mm a')}</p>
      </div>
      <div className="games__bottom">
        <p>
          {kills} {kills === 1 ? 'Kill' : 'Kills'}
        </p>
        <p>
          {placement}
          {placement === 'Victory' ? (
            <i className="fas fa-trophy" />
          ) : (
            placement !== 'Loss' && <i className="fas fa-medal" />
          )}
        </p>
      </div>
    </div>
  );
}

export default Game;