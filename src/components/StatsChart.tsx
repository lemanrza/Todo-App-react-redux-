import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Todo } from '../types/todo.types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatsChartProps {
  todos: Todo[];
}

const StatsChart: React.FC<StatsChartProps> = ({ todos }) => {
  // Filter todos added in the last 24 hours
  const now = new Date();
  const recentTodos = todos.filter(todo => {
    const createdAt = new Date(todo.createdAt);
    return now.getTime() - createdAt.getTime() <= 24 * 60 * 60 * 1000;
  });

  // Count by hour (0-23)
  const hourlyCounts = new Array(24).fill(0);
  recentTodos.forEach(todo => {
    const hour = new Date(todo.createdAt).getHours();
    hourlyCounts[hour]++;
  });

  const data = {
    labels: [...Array(24).keys()].map(h => `${h}:00`),
    datasets: [
      {
        label: 'Todos added',
        data: hourlyCounts,
        backgroundColor: '#4C51BF',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Todos added in the last 24 hours',
      },
    },
  };

  return (
    <div className="flex items-center w-100 h-100">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StatsChart;
