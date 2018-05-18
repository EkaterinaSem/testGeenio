import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'modules/button/Button';

import './modal.css';

class Modal extends Component {

  render() {
    const { error, onModalClick } = this.props;
    return (
      <div className="modal-container" onClick={onModalClick}>
        <div className="modal-wrapper">
          <div className="modal-content">
            {error}
          </div>
          <Button customClass="text" onClick={onModalClick}>OK</Button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Modal;