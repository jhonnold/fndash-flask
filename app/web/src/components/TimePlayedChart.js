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

const colors = [
  theme.primary,
  pSBC(-0.375, theme.primary, false, true),
  pSBC(-0.75, theme.primary, false, true),
];

function TimePlayedChart({ datasets, labels }) {
  const chartData = {
    labels,
    datasets: datasets.map(d => ({
      data: d,
      backgroundColor: colors,
      borderColor: theme.cardBack,
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
