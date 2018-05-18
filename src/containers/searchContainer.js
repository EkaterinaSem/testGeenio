import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from 'modules/search/Search';
import * as actions from 'actions';

class SearchContainer extends Component {

  constructor() {
    super();
    this.searchUser = this.searchUser.bind(this);
    this.onClickCancelButton = this.onClickCancelButton.bind(this);
  }

  searchUser(search_field) {
    const { dispatch } = this.props;
    dispatch(actions.searchUser(search_field));
  }

  onClickCancelButton () {
    const { dispatch } = this.props;
    dispatch(actions.hideSearch());
    dispatch(actions.getAllUsers());
  }

  render() {
    return (
      <Search
        onSearchClick={this.searchUser}
        onCancelClick={this.onClickCancelButton}
      />
    )
  }

}


export default connect()(SearchContainer);