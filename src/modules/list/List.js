import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Users from 'modules/users/Users';

import './list.css';

class List extends Component {

  static renderEmptyBlock(){
    return (
      <div className="empty-block">
        Список пуст
      </div>
    )
  }

  render() {
    const { users } = this.props;

    return (
      <div className={`list-wrapper ${users.length === 0 && 'empty'}`}>
        {users.length > 0 ? <Users users={users} /> :
          List.renderEmptyBlock()
        }
      </div>
    );
  }
}

List.propTypes = {
  users: PropTypes.array.isRequired,
};

export default List;

