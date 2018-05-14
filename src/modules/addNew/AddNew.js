import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'modules/button/Button';
import * as actions from 'actions';

import './addNew.css';

class AddNew extends Component {

  constructor () {
    super();
    this.state = {
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
    this.onClickCancelButton = this.onClickCancelButton.bind(this);
  }

  onClickAddNew() {
    const {user} = this.state;
    const { dispatch } = this.props;
    dispatch(actions.getAllUsers());
    dispatch(actions.createUser(user));
    dispatch(actions.hideAddNew());
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

  onClickCancelButton () {
    const { dispatch } = this.props;
    dispatch(actions.hideAddNew());
  }

  render() {
    const {user} = this.state;
    return (
      <div>
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
            onClick={this.onClickCancelButton}
            cls={'text'}
          >Отмена
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
    ui: state.ui,
  }
};

export default connect(mapStateToProps)(AddNew);