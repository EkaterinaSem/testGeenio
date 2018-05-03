import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';

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

Button.PropTypes = {
  cls: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;