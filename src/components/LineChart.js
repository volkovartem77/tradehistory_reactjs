import React, { Component } from 'react';
import {Line} from "react-chartjs-2";

const chartBackgroundColor = 'rgb(255, 99, 132)';
const chartBorderColor = 'rgb(255, 99, 132)';


const chartOptions = {
    // responsive: false,
    // maintainAspectRatio: false
};


class LineChart extends Component {
    state = {
        labels: [
            "January",
            "February",
            "March",
        ],
        datasets: [{
            label: "My First dataset",
            backgroundColor: chartBackgroundColor,
            borderColor: chartBorderColor,
            data: Array.from({length: 3}, () => Math.floor(Math.random() * 100))
        }]
    };

    updateChart = (data) => {
        this.setState(data)
    };

    render() {
        return (
            <div className="chart-container" style={{
                position: 'relative',
                height: 400,
                width: 800
            }}>
                < Line
                    data={this.state}
                    options={chartOptions}
                    // height={500}
                    // width={700}
                />
            </div>
        )
    }
}

export default LineChart;