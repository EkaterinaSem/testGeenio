import React, { Component } from 'react';
import './styles.css';

class Button extends Component {


  render() {
    const {cls} = this.props;
    return (
      <button className={cls}>{this.props.children}</button>
    );
  }
}

export default Button;