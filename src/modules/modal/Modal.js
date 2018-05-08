import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'modules/button/Button';

import './modal.css';

class Modal extends Component {

  render() {
    const {error, onClick} = this.props;

    return (
      <div className="modal-container" onClick={onClick}>
        <div className="modal-wrapper">
          <div className="modal-content">
            {error.error}
          </div>
          <Button customClass="text" onClick={onClick}>OK</Button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  error: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default Modal;