import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddNew from 'modules/addNew/AddNew';
import * as actions from 'actions';

class AddNewContainer extends Component {

  constructor() {
    super();
    this.onClickAddNew = this.onClickAddNew.bind(this);
    this.onClickCancelButton = this.onClickCancelButton.bind(this);
  }

  onClickAddNew(user) {
    const { dispatch, offset } = this.props;
    dispatch(actions.createUser(user, () => {
      dispatch(actions.hideAddNew());
    }));
    dispatch(actions.getAllUsers(offset));
  }

  onClickCancelButton () {
    const { dispatch } = this.props;
    dispatch(actions.hideAddNew());
  }

  render() {
    return (
      <AddNew
        onClickAddNew={this.onClickAddNew}
        onClickCancelButton={this.onClickCancelButton}
      />
    )
  }

}

AddNewContainer.propTypes = {
  offset: PropTypes.number,
};

AddNewContainer.deafultProps = {
  offset: 1,
};

export default connect()(AddNewContainer);