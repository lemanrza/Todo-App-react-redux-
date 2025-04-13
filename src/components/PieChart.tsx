import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

interface PieChartProps {
    completedCount: number;
    pendingCount: number;
}

const PieChart: React.FC<PieChartProps> = ({ completedCount, pendingCount }) => {
    const data = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                data: [completedCount, pendingCount],
                backgroundColor: ['#00C951', '#FFCE56'],
                hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className='w-80 h-80 '>
            <h2 className='text-center my-5 text-2xl'>Todo Status Distribution</h2>
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
