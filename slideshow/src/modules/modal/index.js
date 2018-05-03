import React, { Component } from 'react';
import './styles.css';
import Button from '../../button';
import PropTypes from 'prop-types';

class Modal extends Component {

  render() {
    const {error, onClick} = this.props;
    console.log('error ',error)
    return (
      <div className="modal-container" onClick={onClick}>
        <div className="modal-wrapper">
          <div className="modal-content">
            {error.error}
          </div>
          <Button cls="text" onClick={onClick}>OK</Button>
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