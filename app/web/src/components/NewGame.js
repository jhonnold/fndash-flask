import React from 'react';
import moment from 'moment-timezone';

function NewGame({ data, user }) {
  return (
    <div className="new-game">
      <h3 className="new-game--user">{user.username}</h3>
      <div className="new-game__top">
        <h4>{data.game_type} Match</h4>
        <p>{moment(data.time_played).format('MM Do - h:mm a')}</p>
      </div>
      <div className="new-game__bottom">
        <p>
          {data.kills} {data.kills === 1 ? 'Kill' : 'Kills'}
        </p>
        <p>
          {data.placement}
          {data.placement === 'Victory' ? (
            <i className="fas fa-trophy" />
          ) : (
            data.placement !== 'Loss' && <i className="fas fa-medal" />
          )}
        </p>
      </div>
    </div>
  )
}

export default NewGame;
