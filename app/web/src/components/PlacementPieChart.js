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

const datasetLabels = {
  solo: ['Solo Victory', 'Solo Top 10', 'Solo Top 25', 'Solo Loss'],
  duo: ['Duo Victory', 'Duo Top 5', 'Duo Top 12', 'Duo Loss'],
  squad: ['Squad Victory', 'Squad Top 3', 'Squad Top 6', 'Squad Loss'],
};

function PlacementPieChart({ data, mode }) {
  let chartData;

  if (mode !== 'all') {
    chartData = {
      datasets: [
        {
          data: data[mode],
          labels: datasetLabels[mode],
          backgroundColor: colors,
        },
      ],
    };
  } else {
    chartData = {
      datasets: ['solo', 'duo', 'squad'].map(k => ({
        data: data[k],
        labels: datasetLabels[k],
        backgroundColor: colors,
        label: k,
      })),
    };
  }

  return (
    <div className="charts__chart">
      <h3>Placements</h3>
      <PieChart data={chartData} options={chartOptions} />
    </div>
  );
}

export default PlacementPieChart;
