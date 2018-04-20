import React, { Component } from 'react';
import './styles.css';
import Button from '../button';

class AddNew extends Component {

  constructor () {
    super();
    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      about: null,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onAboutChange = this.onAboutChange.bind(this);
    this.onClickAddNew = this.onClickAddNew.bind(this);
  }

  onClickAddNew() {
    const {onClickAddButton} = this.props;
    onClickAddButton();

  }

  onNameChange(event) {
    this.setState({
      ['first-name']: event.target.value,
    })
  }

  onLastNameChange(event) {
    this.setState({
      ['last-name']: event.target.value,
    })
  }

  onEmailChange(event) {
    this.setState({
      ['email']: event.target.value,
    })
  }

  onPhoneChange(event) {
    this.setState({
      ['phone']: event.target.value,
    })
  }

  onAboutChange(event) {
    this.setState({
      ['about']: event.target.value,
    })
  }

  render() {
    const {onClickCancelButton} = this.props;
    return (
      <div>
        <div className="add-new-form">
          <div className="input-wrapper">
            <div className="new-name">Имя</div>
            <input
              maxLength={255}
              placeholder={'Введите имя'}
              onChange={this.onNameChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="new-last-name">Фамилия</div>
            <input
              maxLength={255}
              placeholder={'Введите фамилию'}
              onChange={this.onLastNameChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="new-email">E-mail</div>
            <input
              maxLength={255}
              placeholder={'Введите e-mail'}
              onChange={this.onEmailChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="new-phone">Номер телефона</div>
            <input
              type='number'
              maxLength={255}
              placeholder={'Введите номер'}
              onChange={this.onPhoneChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="new-about">Прочее</div>
            <textarea
              maxLength={1000}
              onChange={this.onAboutChange}
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

export default AddNew;