import React from 'react';
import { Pie as PieChart } from 'react-chartjs-2';

const chartOptions = {
  aspectRatio: 2,
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: '#fafafa',
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

const colors = ['#22d900', '#19a100', '#106b00', '#083500'];

const chartData = {
  datasets: [
    {
      data: [1, 2, 3],
      labels: ['Duo Victory', 'Duo Top 5', 'Duo Top 12', 'Duo Loss'],
      backgroundColor: colors,
    },
  ],
};

function PlacementPieChart({ data }) {
  return (
    <div className="charts__chart">
      <h3>Placements</h3>
      <PieChart data={chartData} options={chartOptions} />
    </div>
  );
}

export default PlacementPieChart;
