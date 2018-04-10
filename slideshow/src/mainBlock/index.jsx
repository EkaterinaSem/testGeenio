import React, { Component } from 'react';
import './styles.css'
import Button from '../button';

class MainBlock extends Component {
  render() {
    return (
      <div className="main">
        <div className="button-wrapper">
          <Button >OK</Button>
        </div>
      </div>
    );
  }
}

export default MainBlock;