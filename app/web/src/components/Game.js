import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { pSBC } from '../assets/constants/colors';

const GameDiv = styled.div`
  border-radius: 0.5rem;
  border-left: 0.0625rem solid ${({ theme, color }) => theme[color] || theme.lightBlue};
  background-color: ${({ theme }) => pSBC(-0.0625, theme.primary, false, true)};
  padding: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: flex;

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
    margin: 0;
    text-transform: capitalize;
    ${({ color, theme }) => {
    if (color === 'blue') {
      return `background: linear-gradient(to top right, ${theme.blue}, ${theme.lightBlue});`;
    }
    if (color === 'green') {
      return `background: linear-gradient(to top right, ${theme.turqoise}, ${theme.lightGreen});`;
    }
    if (color === 'purple') {
      return `background: linear-gradient(to top right, ${theme.purple}, ${theme.magenta});`;
    }
    return `background: linear-gradient(to top right, ${theme.pink}, ${theme.peach});`;
  }}
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.offWhite};
  }
`;

const modeToColor = {
  solo: 'blue',
  duo: 'purple',
  squad: 'pink',
};

function Game({
  data: {
    mode, time_played: timePlayed, kills, placement, username, playlist = 'Public',
  },
}) {
  return (
    <GameDiv color={modeToColor[mode] || 'green'}>
      <div>
        <GameHeader color={modeToColor[mode] || 'green'}>
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
