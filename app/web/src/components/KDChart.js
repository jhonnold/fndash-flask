import React from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import Card from './Card';

const chartOptions = {
  responsive: true,
  aspectRatio: 2.5,
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: '#fafafa',
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: '#fafafa',
        },
        gridLines: {
          color: 'rgba(255, 255, 255, 0.125)',
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          fontColor: '#fafafa',
        },
      },
    ],
  },
};

const datasetOptions = {
  borderColor: '#22d900',
  borderWidth: 2,
  fill: true,
  backgroundColor: 'rgba(34, 217, 0, 0.125)',
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
