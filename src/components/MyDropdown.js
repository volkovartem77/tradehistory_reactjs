import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


class MyDropdown extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            items: ['No options'],
            selectedPair: 'Select pair'
        };
    }

    updateItems(data) {
        this.setState({
            items: data.pairs
        })
    }

    updateSelectedPair(data) {
        this.setState({
            selectedPair: data
        })
    }

    renderItems() {
        return this.state.items.map(item => {
            return (
                <Dropdown.Item onClick={this.props.onSelect} key={Math.random() * Math.random()}>{item}</Dropdown.Item>
            )
        })
    }

    render() {
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.selectedPair}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {this.renderItems()}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default MyDropdown