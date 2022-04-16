import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Legend, Title , Tooltip , CategoryScale , scales} from 'chart.js';



const LineChart = (props) => {

    ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Title, Tooltip, scales);

    const options = {
        scales:{
            yAxis: {
                    ticks:{
                        beginAtZero: true
                    }
                }
        },
        
        plugins: {
            legend: {
              display: true,
              position: 'top',
            },

            title: {
                display: true,
                text: props.coinName + ' 7-Day Sparkline',
                padding: {
                  top: 10,
                  bottom: 5
              }
              },
            tooltip:{
                usePointStyle: true,
            }
          },

     
      };

      const data = {
        labels: props.coinChartData.prices?.map(data=> new Date(data[0]).toLocaleDateString()),
        datasets: [
          {
              label:'Price in USD',
              data: props.coinChartData.prices?.map(data=>data[1]),
              backgroundColor:'#00FFF5',
              borderColor:'#00FFF5'
          }
        ],
      };

    return (
        <div className='chart' >
           <Line data={data} options={options}/>
        </div>
    )
}

export default LineChart;

