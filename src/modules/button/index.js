import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';


class Button extends Component {

  render() {
    const {cls, onClick, disabled} = this.props;
    const className = `${cls} ${disabled ? 'disabled' : ''}`;

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

Button.propTypes = {
  cls: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;