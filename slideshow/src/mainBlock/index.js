import React, { Component } from 'react';
import './styles.css';
import ButtonBlock from '../buttonBlock'

class MainBlock extends Component {
    render() {
        return (
            <div className="main-block">
                <ButtonBlock />
            </div>
        );
    }
}

export default MainBlock;