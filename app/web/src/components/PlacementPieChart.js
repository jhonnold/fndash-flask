import React from 'react';
import { Pie as PieChart } from './Charts';
import Card from './Card';
import { theme, pSBC } from '../assets/constants/colors';

const modeEnum = {
  solo: 0,
  duo: 1,
  squad: 2,
};

const modes = ['solo', 'duo', 'squad'];

const labels = [
  { text: 'Solo', fillStyle: theme.lightBlue },
  { text: 'Duo', fillStyle: theme.purple },
  { text: 'Squad', fillStyle: theme.pink },
];

const chartOptions = {
  aspectRatio: 2,
  legend: {
    display: true,
    position: 'right',
    labels: {
      fontColor: theme.offWhite,
      boxWidth: 12,
      padding: 4,
      generateLabels: () => labels,
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

const colors = {
  solo: [
    theme.lightBlue,
    pSBC(-0.2, theme.lightBlue, false, true),
    pSBC(-0.4, theme.lightBlue, false, true),
    pSBC(-0.6, theme.lightBlue, false, true),
  ],
  duo: [
    theme.purple,
    pSBC(-0.2, theme.purple, false, true),
    pSBC(-0.4, theme.purple, false, true),
    pSBC(-0.6, theme.purple, false, true),
  ],
  squad: [
    theme.pink,
    pSBC(-0.2, theme.pink, false, true),
    pSBC(-0.4, theme.pink, false, true),
    pSBC(-0.6, theme.pink, false, true),
  ],
};

function PlacementPieChart({ data, mode }) {
  let chartData = {
    datasets: [],
  };

  if (mode !== 'all') {
    chartData = {
      datasets: [
        {
          data: data.datasets[modeEnum[mode]],
          labels: data.labels[modeEnum[mode]],
          backgroundColor: colors[mode],
          borderColor: theme.primary,
          borderWidth: 6,
          label: mode,
        },
      ],
      labels: [mode],
    };
  } else {
    chartData = {
      datasets: data.datasets.map((p, i) => ({
        data: p,
        labels: data.labels[i],
        backgroundColor: colors[modes[i]],
        borderColor: theme.primary,
        borderWidth: 6,
        label: modes[i],
      })),
      labels: modes,
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
