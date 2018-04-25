import React, { Component } from 'react';
import './styles.css';
import Button from '../button';
import UserRow from './userRow';

class Users extends Component {

  renderUsersList() {
    const  { users } = this.props;

    return <div className="users">
      {users.map((user, key) => <div key={key} className="user-row">
        <div className="user-data id">{user.id}</div>
        <div className="user-data first-name">{user.first_name}</div>
        <div className="user-data last-name">{user.last_name}</div>
        <div className="user-data email">{user.email}</div>
        <div className="user-data phone">{user.phone}</div>
        <div className="user-data about">{user.about}</div>
        <div className="user-data buttons">
          <Button cls="edit" />
          <Button cls="delete" />
        </div>
      </div>)}
    </div>;
  }

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