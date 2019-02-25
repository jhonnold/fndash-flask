import React from 'react';
import { Pie as PieChart } from 'react-chartjs-2';

const chartOptions = {
  aspectRatio: 2,
  legend: {
    display: false,
    position: 'bottom',
    labels: {
      fontColor: '#fafafa',
    },
  },
};


const colors = ['#22d900', '#19a100', '#106b00'];

function TimePlayedChart({ datasets, labels }) {
  const chartData = {
    labels,
    datasets: datasets.map(d => ({
      data: d,
      backgroundColor: colors,
    })),
  };

  return (
    <div className="charts__chart">
      <h3>Time Played</h3>
      <PieChart data={chartData} options={chartOptions} />
    </div>
  );
}

export default TimePlayedChart;
