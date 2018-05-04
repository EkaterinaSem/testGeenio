import React, { Component } from 'react';
import './styles.css';
import Users from '../users/index';
import PropTypes from 'prop-types';

class List extends Component {

  static renderEmptyBlock(){
    return (
      <div className="empty-block">
        Список пуст
      </div>
    )
  }

  render() {
    const {users} = this.props;
    console.log('total count ',users, users.total_count);
    return (
      <div className={`list-wrapper ${users.total_count === 0 && 'empty'}`}>
        {users.total_count > 0 ? <Users users={users.users} /> :
          List.renderEmptyBlock()
        }
      </div>
    );
  }
}

List.PropTypes = {
  users: PropTypes.any,
};

export default List;

