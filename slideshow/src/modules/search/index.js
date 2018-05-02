import React, { Component } from 'react';
import './styles.css';
import Button from '../../button';
import $ from "jquery";
import Modal from "../modal";

class Search extends Component {

  constructor () {
    super();
    this.state = {
      errors: null,
      id: null,
    };

    this.onClickSearch = this.onClickSearch.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  searchUser() {
    const {onClickAddButton, updateAfterSearch} = this.props;
    const {id} = this.state;
    return $.ajax({
      method: `GET`,
      crossDomain: true,
      url: `https://geenio-test-job.herokuapp.com/api/v1/users/${id}?api_key=DVEXd6WRcc69cvXI`,
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

  onClickSearch() {
    this.searchUser();
  }

  onInputChange(event) {
    this.setState({
      id:  event.target.value,
    });
  }

  hideModal() {
    this.setState({
      errors: null,
    });
  }

  render() {
    const {onClickCancelButton} = this.props;
    const {id, errors} = this.state;
    return (
      <div>
        { errors && <Modal error={errors} onClick={this.hideModal} /> }
        <div className="search-form">
          <div className={`input-wrapper ${id && 'not-empty'}`}>
            <input
              name="id"
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder new-name">User ID</div>
          </div>
        </div>
        <div className="button-wrapper">
          <Button
            onClick={this.onClickSearch}
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

export default Search;