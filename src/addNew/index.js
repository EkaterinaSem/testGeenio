import React, { Component } from 'react';
import './styles.css';
import Button from '../button';
import $ from "jquery";
import Modal from "../modules/modal";
import PropTypes from 'prop-types';

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
    this.createUser = this.createUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  createUser() {
  const {onClickAddButton, uploadAfterCreate} = this.props;
  return $.ajax({
         method: `POST`,
         crossDomain: true,
         url: `https://geenio-test-job.herokuapp.com/api/v1/users?api_key=DVEXd6WRcc69cvXI`,
         data: this.state.user,
       })
       .done(() => {
         onClickAddButton();
         uploadAfterCreate(this.state.user);
       })
       .fail((jqXHR) => {
         const error = jqXHR.responseJSON;
         this.setState({
           errors: error,
         });
         console.log(this.state)
       });
  }

  onClickAddNew() {
    this.createUser();
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
          <div className={`input-wrapper ${user.first_name && 'not-empty'}`}>
            <input
              name="first_name"
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder new-name">Имя</div>
          </div>
          <div className={`input-wrapper ${user.last_name && 'not-empty'}`}>
            <input
              name="last_name"
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder new-last-name">Фамилия</div>
          </div>
          <div className={`input-wrapper ${user.email && 'not-empty'}`}>
            <input
              name="email"
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder new-email">E-mail</div>
          </div>
          <div className={`input-wrapper ${user.phone && 'not-empty'}`}>
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

AddNew.PropTypes = {
  onClickCancelButton: PropTypes.func,
};

export default AddNew;