import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './button.css';


class Button extends Component {

  render() {
    const {customClass, onClick, disabled} = this.props;
    const className = `${customClass} ${disabled ? 'disabled' : ''}`;

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

Button.defaultProps = {
  disabled: false,
  customClass: ''
};

Button.propTypes = {
  customClass: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;