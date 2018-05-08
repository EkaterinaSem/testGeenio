import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'modules/button/Button';
import Modal from "modules/modal/Modal";
import api from 'api/users';

import './search.css';

class Search extends Component {

  constructor () {
    super();
    this.state = {
      errors: null,
      search_field: null,
      last_name: null,
    };

    this.searchUser = this.searchUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  searchUser() {
    const {updateAfterSearch} = this.props;
    const {search_field} = this.state;
    api.searchUser(search_field)
    .done((data) => {
      updateAfterSearch(data);
    })
    .fail((jqXHR) => {
      const error = jqXHR.responseJSON;
      this.setState({
        errors: error,
      });
    });
  }

  onInputChange(event) {
    this.setState({
      search_field:  event.target.value,
    });
  }

  hideModal() {
    this.setState({
      errors: null,
    });
  }

  render() {
    const {onClickCancelButton} = this.props;
    const {search_field, errors} = this.state;

    return (
      <div>
        { errors && <Modal error={errors} onClick={this.hideModal} /> }
        <div className="search-form">
          <div className={`input-wrapper ${search_field && 'not-empty'}`}>
            <input
              name="search_field"
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder search-field">Кого ищем?</div>
          </div>
      </div>
        <div className="button-wrapper">
          <Button
            onClick={this.searchUser}
          >Искать
          </Button>
          <Button
            onClick={onClickCancelButton}
            cls={'text'}
          >Отмена
          </Button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onClickCancelButton: PropTypes.func,
};

export default Search;