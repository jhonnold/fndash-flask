import React from 'react';

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
  let hours = getHoursPlayed(data.datasets[0], mode);
  if (hours < 1) {
    hours = '< 1';
  }
  return (
    <div className="charts__time">
      <h3>Time Played</h3>
      <h4>
        {hours} <span>Hours</span>
      </h4>
    </div>
  );
}

export default TimePlayed;
