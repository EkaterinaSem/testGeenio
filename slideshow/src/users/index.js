import React, { Component } from 'react';
import './styles.css';
import UserRow from './userRow/index';

class Users extends Component {

  render() {
    const {users} = this.props;
    return (
      <div className="users-list-wrapper">
        <div className="users-list-head">
          <div className="list-data id">ID</div>
          <div className="list-data first-name">Имя</div>
          <div className="list-data last-name">Фамилия</div>
          <div className="list-data email">E-mail</div>
          <div className="list-data phone">Телефон</div>
          <div className="list-data about">Прочее</div>
          <div className="list-data "/>
        </div>
        { users.map((user, key) => <UserRow user={user} key={key} />) }

      </div>
    );
  }
}

export default Users;