import React from 'react';
import { Pie as PieChart } from './Charts';
import Card from './Card';
import { theme } from '../assets/constants/colors';

const genLabels = [
  { text: 'Solo', fillStyle: theme.lightBlue },
  { text: 'Duo', fillStyle: theme.purple },
  { text: 'Squad', fillStyle: theme.pink },
];

const colors = [theme.lightBlue, theme.purple, theme.pink];

const chartOptions = {
  aspectRatio: 2,
  legend: {
    display: true,
    position: 'right',
    labels: {
      fontColor: theme.offWhite,
      boxWidth: 12,
      padding: 4,
      generateLabels: () => genLabels,
    },
  },
};

function TimePlayedChart({ datasets, labels }) {
  const chartData = {
    labels,
    datasets: datasets.map(d => ({
      data: d,
      backgroundColor: colors,
      borderColor: theme.primary,
      borderWidth: 6,
      label: `time-played-${d}`,
    })),
  };

  return (
    <Card>
      <h3>Time Played</h3>
      <PieChart redraw data={chartData} options={chartOptions} />
    </Card>
  );
}

export default TimePlayedChart;
