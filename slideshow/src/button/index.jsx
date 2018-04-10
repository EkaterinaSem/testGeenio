import React, { Component } from 'react';
import './styles.css';

class Button extends Component {


  render() {

    return (
      <button>{this.props.children}</button>
    );
  }
}

export default Button;