import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'modules/button/Button';
import * as actions from 'actions';

import './search.css';

class Search extends Component {

  constructor () {
    super();
    this.state = {
      search_field: null,
    };

    this.searchUser = this.searchUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickCancelButton = this.onClickCancelButton.bind(this);
  }

  searchUser() {
    const {search_field} = this.state;
    const { dispatch } = this.props;
    dispatch(actions.searchUser(search_field));
  }

  onInputChange(event) {
    this.setState({
      search_field:  event.target.value,
    });
  }

  onClickCancelButton () {
    const { dispatch } = this.props;
    dispatch(actions.hideSearch());
    dispatch(actions.getAllUsers());
  }

  render() {
    const { search_field } = this.state;

    return [
      <div key={1} className="search-form">
        <div className={`input-wrapper ${search_field && 'not-empty'}`}>
          <input
            name="search_field"
            maxLength={255}
            onChange={this.onInputChange}
          />
          <div className="placeholder search-field">Кого ищем?</div>
        </div>
      </div>,
      <div key={2} className="button-wrapper">
        <Button
        onClick={this.searchUser}
      >Искать
        </Button>
        <Button
          onClick={this.onClickCancelButton}
          cls={'text'}
        >Отмена
        </Button>
      </div>
    ];
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
};

export default connect(mapStateToProps)(Search);