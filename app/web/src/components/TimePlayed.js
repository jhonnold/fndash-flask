import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const H3 = styled.h3`
  color: ${({ theme }) => theme.primary};
`;

function getHoursPlayed(data, mode) {
  if (mode === 'solo') {
    return data[0];
  }
  if (mode === 'duo') {
    return data[1];
  }
  if (mode === 'squad') {
    return data[2];
  }
  return -1;
}

function TimePlayed({ data, mode }) {
  const hours = getHoursPlayed(data.datasets[0], mode);
  return (
    <Card>
      <H3>Time Played</H3>
      <h4>
        {hours} <span>Minutes</span>
      </h4>
    </Card>
  );
}

export default TimePlayed;
