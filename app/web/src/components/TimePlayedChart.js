import React from 'react';
import { Pie as PieChart } from 'react-chartjs-2';
import Card from './Card';
import { theme, pSBC } from '../assets/constants/colors';

const chartOptions = {
  aspectRatio: 2,
  legend: {
    display: false,
    position: 'bottom',
    labels: {
      fontColor: theme.fontColor,
    },
  },
};

// return `background: linear-gradient(to top right, ${theme.blue}, ${theme.lightBlue});`;
//     }
//     if (color === 'green') {
//       return `background: linear-gradient(to top right, ${theme.turqoise}, ${theme.lightGreen});`;
//     }
//     if (color === 'purple') {
//       return `background: linear-gradient(to top right, ${theme.purple}, ${theme.magenta});`;
//     }
//     return `background: linear-gradient(to top right, ${theme.pink}, ${theme.peach});`;

const colors = [
  theme.lightGreen,
  pSBC(-0.375, theme.lightGreen, false, true),
  pSBC(-0.75, theme.lightGreen, false, true),
];

function TimePlayedChart({ datasets, labels }) {
  const chartData = {
    labels,
    datasets: datasets.map(d => ({
      data: d,
      backgroundColor: colors,
      borderColor: theme.primary,
      borderWidth: 6,
    })),
  };

  return (
    <Card>
      <h3>Time Played</h3>
      <PieChart data={chartData} options={chartOptions} />
    </Card>
  );
}

export default TimePlayedChart;
