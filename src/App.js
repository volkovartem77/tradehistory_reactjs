import React, { Component } from 'react';
import './App.css';
import Socket from 'simple-websocket';

import MainChart from './components/MainChart'
import MyDropdown from './components/MyDropdown'
import MyTable from './components/MyTable'


function getKey() {
    return Math.random() * Math.random()
}


const rowStyle = {maxWidth: '100%', margin: 25};


class App extends Component {
    constructor(props) {
        super(props);
        this.buyChartElement = React.createRef();
        this.sellChartElement = React.createRef();
        this.buyTableElement = React.createRef();
        this.sellTableElement = React.createRef();
        this.dropdownElement = React.createRef();

        var sock = new Socket('ws://localhost:9999');

        sock.on('data', function (data) {
            data = JSON.parse(data);

            if ('buy' in data) {
                this.buyChartElement.current.updateChart(data.buy);
                this.sellChartElement.current.updateChart(data.sell);
                this.buyTableElement.current.updateTable(data.buy);
                this.sellTableElement.current.updateTable(data.sell);
            }

            if ('pairs' in data) {
                this.dropdownElement.current.updateItems(data);
            }
        }.bind(this));

        this.state = {
            socket: sock
        }
    };

    handleSelected(e) {
        e.preventDefault();
        this.state.socket.send(e.target.innerText);
        this.dropdownElement.current.updateSelectedPair(e.target.innerText);
    }

    render() {
        return (
            <div className="App">
                <div className="row" style={rowStyle} key={getKey()}>
                    <div className="col-2" key={getKey()}>
                        <MyDropdown onSelect={this.handleSelected.bind(this)} ref={this.dropdownElement} />
                    </div>
                    <div className="col-10" key={getKey()}>
                        <h1>BINANCE Trade History Monitoring</h1>
                    </div>
                </div>
                <div className="row" style={rowStyle} key={getKey()}>
                    <div className="col-9">
                        <MainChart barColor="#6BA583" ref={this.buyChartElement} />
                    </div>
                    <div className="col-3">
                        <MyTable textColor="#6BA583" ref={this.buyTableElement} key={getKey()} />
                    </div>
                </div>
                <div className="row" style={rowStyle} key={getKey()}>
                    <div className="col-9">
                        <MainChart barColor={"#FF0000"} ref={this.sellChartElement} />
                    </div>
                    <div className="col-3">
                        <MyTable textColor="#FF0000" ref={this.sellTableElement} key={getKey()} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
