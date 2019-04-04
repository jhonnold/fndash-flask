import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

const GRADIENTS = {
  blue: theme => `linear-gradient(to top right, ${theme.blue}, ${theme.lightBlue})`,
  green: theme => `linear-gradient(to top right, ${theme.turqoise}, ${theme.lightGreen})`,
  purple: theme => `linear-gradient(to top right, ${theme.purple}, ${theme.magenta})`,
  pink: theme => `linear-gradient(to top right, ${theme.pink}, ${theme.peach})`,
};

const MODE_COLOR_MAP = {
  solo: 'blue',
  duo: 'purple',
  squad: 'pink',
};

const getPlacementIcon = (p) => {
  if (p === 'Victory') return <i className="fas fa-trophy" />;
  if (p === 'Loss') return null;
  return <i className="fas fa-medal" />;
};

const GameBase = styled.div`
  background-color: ${({ theme }) => theme.offPrimary};
  border-left: 2px solid ${({ theme, color }) => theme[color] || theme.lightGreen};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const GameTypeHeader = styled.h5`
  margin: 0;
  line-height: 1;
  text-transform: capitalize;
  background: ${({ theme, color }) => GRADIENTS[color](theme)};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GamePlayedAt = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.offWhite};
`;

const GameMetaContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GamePlacement = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.white};
`;

const GameKillContainer = styled.div`
  white-space: nowrap;
`;

const GameKillsCount = styled.h5`
  display: inline;
  color: ${({ theme }) => theme.white};
  margin: 0;
  margin-right: 0.25rem;
`;

const GameKillsLabel = styled.p`
  display: inline;
  margin: 0;
`;

const FillerDiv = styled.div`
  flex: 1;
`;

export default ({ data }) => {
  const {
    mode, time_played: timePlayed, kills, placement, playlist,
  } = data;

  return (
    <GameBase color={MODE_COLOR_MAP[mode]}>
      <GameTypeHeader color={MODE_COLOR_MAP[mode]}>
        {playlist} {mode} Match
      </GameTypeHeader>
      <GamePlayedAt>{moment(timePlayed).fromNow()}</GamePlayedAt>
      <GameMetaContainer>
        <GamePlacement>
          {getPlacementIcon(placement)} {placement}
        </GamePlacement>
        <FillerDiv />
        <GameKillContainer>
          <GameKillsCount>{kills}</GameKillsCount>
          <GameKillsLabel>{`Kill${kills !== 1 ? 's' : ''}`}</GameKillsLabel>
        </GameKillContainer>
      </GameMetaContainer>
    </GameBase>
  );
};
