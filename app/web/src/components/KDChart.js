import React from 'react';
import { Line as LineChart } from 'react-chartjs-2';

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

const chartData = {
  labels: ['1', '2', '3'],
  datasets: [
    {
      label: 'Daily K/D',
      data: [1, 2, 3],
      ...datasetOptions,
    },
  ],
};

function KDChart({ data }) {
  return (
    <div className="charts__chart">
      <h3>K/D per Day</h3>
      <LineChart data={chartData} options={chartOptions} />
    </div>
  );
}

export default KDChart;
