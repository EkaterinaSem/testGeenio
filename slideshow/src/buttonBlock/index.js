import React, { Component } from 'react';
import './styles.css';


class MainBlock extends Component {
    render() {
        return (
            <div className="button-block">
                <button className="js-add-user add-user-button">Add user</button>
            </div>
        );
    }
}

export default MainBlock;

