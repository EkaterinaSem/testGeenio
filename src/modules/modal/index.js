import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'modules/button';

import './styles.css';

class Modal extends Component {

  render() {
    const {error, onClick} = this.props;

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

Modal.propTypes = {
  error: PropTypes.object,
  onClick: PropTypes.func,
};

export default Modal;