import React from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import Card from './Card';
import { theme, pSBC } from '../assets/constants/colors';

const chartOptions = {
  responsive: true,
  aspectRatio: 2.5,
  legend: {
    display: false,
    position: 'bottom',
    labels: {
      fontColor: theme.offWhite,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: theme.offWhite,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: theme.offWhite,
        },
      },
    ],
  },
};

const colors = [theme.lightGreen, pSBC(-0.25, theme.primary, false, true)];

const datasetOptions = {
  borderWidth: 2,
  fill: true,
  pointRadius: 4,
  // lineTension: 0,
};

const datasetNames = ['Daily K/D', 'Lifetime K/D'];

function KDChart({ labels, datasets }) {
  const chartData = {
    labels,
    datasets: datasets.map((d, i) => ({
      data: d,
      label: datasetNames[i],
      borderColor: colors[i],
      pointBorderColor: colors[i],
      pointBackgroundColor: colors[i],
      pointHoverBackgroundColor: colors[i],
      pointHoverBorderColor: colors[i],
      backgroundColor: `${pSBC(-0.2, colors[i], false, true)}40`,
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
