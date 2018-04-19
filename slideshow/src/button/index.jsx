import React, { Component } from 'react';
import './styles.css';

class Button extends Component {


  render() {
    const {cls, onClick, disabled} = this.props;
    return (
      <button
        onClick={onClick}
        className={cls}
        disabled={disabled}
      >{this.props.children}
      </button>
    );
  }
}


export default Button;