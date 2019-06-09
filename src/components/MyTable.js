import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import './MyTable.css'


const initData = [
    {
        "price": 0.324324,
        "quantity": 23424,
        "time": "2019-05-30T12:34:15Z"
    },
    {
        "price": 0.324324,
        "quantity": 23424,
        "time": "2019-05-30T12:34:15Z"
    }
];


function getKey() {
    return Math.random() * Math.random()
}


function getData(data) {
    data.reverse();
    return data.map(item => {
        return {
            time: item.time.split('T')[1].replace('Z', ''),
            price: parseFloat(item.price),
            quantity: parseFloat(item.quantity)
        }
    })
}


class MyTable extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            data: getData(initData)
        };
    }

    updateTable = (data) => {
        this.setState({
            data: getData(data)
        })
    };

    renderRow() {
        return this.state.data.map(item => {
            return (
                <tr key={getKey()} style={{fontSize: 11}}>
                    <td key={getKey()} style={{color: this.props.textColor, fontSize: 14}}>{item.price} </td>
                    <td key={getKey()} >{item.quantity}</td>
                    <td key={getKey()} >{item.time}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="mytable">
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                    <tr key={getKey()}>
                        <th key={getKey()}>Price</th>
                        <th key={getKey()}>Amount</th>
                        <th key={getKey()}>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRow()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default MyTable