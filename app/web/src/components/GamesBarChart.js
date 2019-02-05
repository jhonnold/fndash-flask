import React from 'react';
import { Bar as BarChart } from 'react-chartjs-2';

const chartOptions = {
  responsive: true,
  aspectRatio: 2.5,
  legend: {
    display: false,
    position: 'bottom',
    labels: {
      fontColor: '#fafafa',
    },
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          color: 'rgba(255, 255, 255, 0.125)',
        },
        ticks: {
          fontColor: '#fafafa',
          beginAtZero: true,
        },
      },
    ],
  },
};

const colors = ['#083500', '#0c5000', '#106b00', '#158600', '#19a100', '#1dbb00', '#22d900'];

const chartData = {
  labels: [1, 2, 3],
  datasets: [
    {
      data: [1, 2, 3],
      backgroundColor: colors,
    },
  ],
};

function GamesBarChart({ data }) {
  return (
    <div className="charts__chart">
      <h3>Games per Day</h3>
      <BarChart data={chartData} options={chartOptions} />
    </div>
  );
}

export default GamesBarChart;
