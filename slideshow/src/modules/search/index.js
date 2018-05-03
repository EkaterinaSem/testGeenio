import React, { Component } from 'react';
import './styles.css';
import Button from '../../button';
import $ from "jquery";
import Modal from "../modal";
import PropTypes from 'prop-types';

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
    return $.ajax({
      method: `GET`,
      crossDomain: true,
      url: `https://geenio-test-job.herokuapp.com/api/v1/users?api_key=DVEXd6WRcc69cvXI&name=${search_field}`,
    })
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

Search.PropTypes = {
  onClickCancelButton: PropTypes.func,
};

export default Search;