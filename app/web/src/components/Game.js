import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';

const GameDiv = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border};
  border-left: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: flex;

  h5,
  h4 {
    color: ${({ theme }) => theme.primary};
    text-transform: capitalize;
  }

  p {
    margin: 0;
  }

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:last-of-type {
      align-items: flex-end;
    }
  }

  i {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.primary};
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  span > h5 {
    display: inline;
  }
`;

const GameHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  h5 {
    text-transform: capitalize;
    margin: 0;
  }

  p {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.mediumGray};
  }
`;

function Game({
  data: {
    mode, time_played: timePlayed, kills, placement, username, playlist = 'Public',
  },
}) {
  return (
    <GameDiv>
      <div>
        <GameHeader>
          <h5>
            {playlist} {mode} Match
          </h5>
          {/* <p>{moment(timePlayed).format('MMM Do - h:mm a')}</p> */}
          <p>{moment(timePlayed).calendar()}</p>
        </GameHeader>
        <p>
          {placement === 'Victory' ? (
            <i className="fas fa-trophy" />
          ) : (
            placement !== 'Loss' && <i className="fas fa-medal" />
          )}
          {placement}
        </p>
      </div>
      <div>
        <div>{username && <h5>{username}</h5>}</div>
        <span>
          <h5>{kills}</h5> {kills === 1 ? 'Kill' : 'Kills'}
        </span>
      </div>
    </GameDiv>
  );
}

export default Game;
