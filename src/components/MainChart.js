import React, { Component } from 'react';
import { TypeChooser } from "react-stockcharts/lib/helper";
import Chart from './Chart';
import { getData } from "./utils"


const initData = [
    {
        "time": "2019-05-30T12:34:15Z",
        "price": 0.02294000,
        "quantity": 18739.00000000
    },
    {
        "time": "2019-05-30T12:34:16Z",
        "price": 0.02294000,
        "quantity": 18050.00000000
    },
    {
        "time": "2019-05-30T12:34:19Z",
        "price": 0.02294000,
        "quantity": 797.00000000
    }
];


class MainChart extends Component {

    componentDidMount() {
        this.setState({
            data: getData(initData)
        })
    }

    updateChart = (data) => {
        this.setState({
            data: getData(data)
        })
    };

    render() {
        if (this.state == null) {
            return (
                <div>
                    <div>Loading...</div>
                </div>
            )
        }

        if (this.state.data.length === 0) {
            return (
                <div>
                    <h2>No data for this pair</h2>
                </div>
            )
        }

        return (
            <div>
                <TypeChooser>
                    {type => <Chart
                        type={type}
                        data={this.state.data}
                        // width={1000}
                        ratio={1}
                        barColor={this.props.barColor}
                    />}
                </TypeChooser>
            </div>
        )
    }
}

export default MainChart;