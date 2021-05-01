import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export const PieChartComponent = ({totalWins, totalMatches}) => {
    return (
        <div>
        <PieChart
        data={[
          { title: 'Wins', value: totalWins, color: '#4da375' },
          { title: 'Losses', value: totalMatches - totalWins, color: '#e15454' }
        ]}
      />
        </div>
    )
}
