import React from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import Card from './Card';
import { theme, pSBC } from '../assets/constants/colors';

const chartOptions = {
  responsive: true,
  aspectRatio: 2.5,
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: theme.fontColor,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: theme.fontColor,
        },
        gridLines: {
          color: theme.border,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          fontColor: theme.fontColor,
        },
      },
    ],
  },
};

const colors = [theme.primary, pSBC(-0.25, theme.primary, false, true)];

const datasetOptions = {
  borderWidth: 2,
  fill: true,
  pointRadius: 4,
  lineTension: 0,
};

const datasetNames = [
  'Daily K/D',
  'Lifetime K/D',
];

function KDChart({ labels, datasets }) {
  const chartData = {
    labels,
    datasets: datasets.map((d, i) => ({
      data: d,
      label: datasetNames[i],
      borderColor: colors[i],
      backgroundColor: pSBC(-0.2, colors[i], false, true) + '40',
      ...datasetOptions,
    })),
  };

  return (
    <Card>
      <h3>K/D per Day</h3>
      <LineChart data={chartData} options={chartOptions} />
    </Card>
  );
}

export default KDChart;
