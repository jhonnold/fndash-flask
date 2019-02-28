import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';

const GameDiv = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem;
  margin-bottom: 1rem;

  h5 {
    color: ${({ theme }) => theme.primary};
  }

  p { margin: 0; }

  > div {
    display: flex;
    justify-content: space-between;
  }

  i {
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.primary};
  }
`;

function Game({
  data: {
    game_type: gameType, time_played: timePlayed, kills, placement,
  },
}) {
  return (
    <GameDiv>
      <div>
        <h5>{gameType} Match</h5>
        <p>{moment(timePlayed).format('MMM Do - h:mm a')}</p>
      </div>
      <div>
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
    </GameDiv>
  );
}

export default Game;
