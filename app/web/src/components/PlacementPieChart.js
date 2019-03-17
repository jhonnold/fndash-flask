import React from 'react';
import { Pie as PieChart } from 'react-chartjs-2';
import Card from './Card';
import { theme, pSBC } from '../assets/constants/colors';

const chartOptions = {
  aspectRatio: 2,
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: theme.fontColor,
    },
  },
  tooltips: {
    callbacks: {
      label(tooltipItem, data) {
        const dataset = data.datasets[tooltipItem.datasetIndex];
        const { index } = tooltipItem;
        return `${dataset.labels[index]}: ${dataset.data[index]}`;
      },
    },
  },
};

const colors = [
  theme.lightGreen,
  pSBC(-0.25, theme.lightGreen, false, true),
  pSBC(-0.5, theme.lightGreen, false, true),
  pSBC(-0.75, theme.lightGreen, false, true),
];

const modeEnum = {
  solo: 0,
  duo: 1,
  squad: 2,
};

function PlacementPieChart({ data, mode }) {
  let chartData;

  if (mode !== 'all') {
    chartData = {
      datasets: [
        {
          data: data.datasets[modeEnum[mode]],
          labels: data.labels[modeEnum[mode]],
          backgroundColor: colors,
          borderColor: theme.primary,
          borderWidth: 6,
        },
      ],
    };
  } else {
    chartData = {
      datasets: data.datasets.map((p, i) => ({
        data: p,
        labels: data.labels[i],
        backgroundColor: colors,
        borderColor: theme.primary,
        borderWidth: 6,
        label: i,
      })),
    };
  }

  return (
    <Card>
      <h3>Placements</h3>
      <PieChart data={chartData} options={chartOptions} />
    </Card>
  );
}

export default PlacementPieChart;
