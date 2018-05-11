import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'modules/button/Button';
import * as actions from 'actions';

import './modal.css';

class Modal extends Component {

  onClick () {
    const { dispatch } = this.props;
    dispatch(actions.hideModal());
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="modal-container" onClick={this.onClick.bind(this)}>
        <div className="modal-wrapper">
          <div className="modal-content">
            {errors.error}
          </div>
          <Button customClass="text" onClick={this.onClick.bind(this)}>OK</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.list.errors
  }
};

export default connect(mapStateToProps)(Modal);