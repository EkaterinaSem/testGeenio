import React, { Component } from 'react';
import './styles.css';
import Button from '../button';

class AddNew extends Component {

  render() {
    const {onClickCancel} = this.props;
    return (
      <div>
        <div className="add-new-form">
          <div className="input-wrapper">
            <div className="new-name">Имя</div>
            <input
              maxLength={255}
              placeholder={'Введите имя'}
            />
          </div>
          <div className="input-wrapper">
            <div className="new-last-name">Фамилия</div>
            <input
              maxLength={255}
              placeholder={'Введите фамилию'}
            />
          </div>
          <div className="input-wrapper">
            <div className="new-email">E-mail</div>
            <input
              maxLength={255}
              placeholder={'Введите e-mail'}
            />
          </div>
          <div className="input-wrapper">
            <div className="new-phone">Номер телефона</div>
            <input
              type='number'
              maxLength={255}
              placeholder={'Введите номер'}
            />
          </div>
          <div className="input-wrapper">
            <div className="new-about">Прочее</div>
            <textarea
              maxLength={1000}
            />
          </div>
        </div>
        <div className="button-wrapper">
          <Button>Добавить</Button>
          <Button
            onClick={onClickCancel}
            cls={'text'}
          >Отмена
          </Button>
        </div>
      </div>
    );
  }
}

export default AddNew;