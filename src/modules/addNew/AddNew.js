import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'modules/button/Button';
import Modal from "modules/modal/Modal";
import api from 'api/users';

import './addNew.css';

class AddNew extends Component {

  constructor () {
    super();
    this.state = {
      errors: null,
      user: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        about: null,
      }
    };

    this.onClickAddNew = this.onClickAddNew.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  onClickAddNew() {
    const {onClickAddButton, uploadAfterCreate} = this.props;
    const {user} = this.state;
    api.createUser(user)
    .done(() => {
      onClickAddButton();
      uploadAfterCreate(user);
    })
    .fail((jqXHR) => {
      const error = jqXHR.responseJSON;
      this.setState({
        errors: error,
      });
    });
  }

  onInputChange(event) {
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [event.target.name]: event.target.value,
      }
    });
  }

  hideModal() {
    this.setState({
      errors: null,
    });
  }

  render() {
    const {onClickCancelButton} = this.props;
    const {user, errors} = this.state;
    return (
      <div>
        { errors && <Modal error={errors} onClick={this.hideModal} /> }
        <div className="add-new-form">
          <div className={`input-wrapper ${user.first_name ? 'not-empty' : ''}`}>
            <input
              name="first_name"
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder new-name">Имя</div>
          </div>
          <div className={`input-wrapper ${user.last_name ? 'not-empty' : ''}`}>
            <input
              name="last_name"
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder new-last-name">Фамилия</div>
          </div>
          <div className={`input-wrapper ${user.email ? 'not-empty' : ''}`}>
            <input
              name="email"
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder new-email">E-mail</div>
          </div>
          <div className={`input-wrapper ${user.phone ? 'not-empty' : ''}`}>
            <input
              name="phone"
              type='number'
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder new-phone">Номер телефона</div>
          </div>
          <div className="input-wrapper">
            <div className="new-about">Прочее</div>
            <textarea
              name="about"
              maxLength={1000}
              onChange={this.onInputChange}
            />
          </div>
        </div>
        <div className="button-wrapper">
          <Button
            onClick={this.onClickAddNew}
          >Добавить
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

AddNew.propTypes = {
  onClickCancelButton: PropTypes.func.isRequired,
};

export default AddNew;