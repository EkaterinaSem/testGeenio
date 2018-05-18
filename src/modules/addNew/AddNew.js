import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'modules/button/Button';

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

    this.onClick = this.onClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  onClick() {
    const { user } = this.state;
    const { onClickAddNew } = this.props;
    onClickAddNew(user);
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

  renderForm () {
    const { user } = this.state;
    const form = Object.keys(user).map((key) => {
      if (key !== 'about') {
        return (
          <div key={key} className={`input-wrapper ${user[key] ? 'not-empty' : ''}`}>
            <input
              name={key}
              maxLength={255}
              onChange={this.onInputChange}
            />
            <div className="placeholder new-name">{key}</div>
          </div>
        )
      } else {
        return (
          <div key={key} className="input-wrapper">
            <div className="new-about">about</div>
            <textarea
              name="about"
              maxLength={1000}
              onChange={this.onInputChange}
            />
          </div>
        )
      }
    });
    return form;
  }

  render() {
    const { onClickCancelButton } = this.props;
    return (
      <div>
        <div className="add-new-form">
          {this.renderForm()}
        </div>
        <div className="button-wrapper">
          <Button
            onClick={this.onClick}
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

const mapStateToProps = (state) => {
  return {
    list: state.list,
    ui: state.ui,
  }
};

export default connect(mapStateToProps)(AddNew);