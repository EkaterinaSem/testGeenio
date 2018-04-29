import React, { Component } from 'react';
import './styles.css';
import Button from '../../button';
import PropTypes from 'prop-types';

class Modal extends Component {

  render() {
    const {text, onClick} = this.props;
    return (
      <div className="modal-container">
        <div className="modal-wrapper">
          <div className="modal-content">
            {text}
          </div>
          <Button className="text" onClick={onClick}>OK</Button>
        </div>
      </div>
    );
  }
}

Modal.PropTypes = {
  error: PropTypes.string,
  onClick: PropTypes.func,
};

export default Modal;