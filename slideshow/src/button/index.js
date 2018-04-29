import React, { Component } from 'react';
import './styles.css';

class Button extends Component {


  render() {
    const {cls, onClick, disabled} = this.props;
    const className = `${cls} ${disabled && 'disabled'}`;

    return (
      <button
        onClick={onClick}
        className={className}
        disabled={disabled}
      >{this.props.children}
      </button>
    );
  }
}


export default Button;