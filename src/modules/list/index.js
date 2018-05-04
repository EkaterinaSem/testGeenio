import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Users from 'modules/users/index';

import './styles.css';

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

    return (
      <div className={`list-wrapper ${users.total_count === 0 && 'empty'}`}>
        {users.total_count > 0 ? <Users users={users.users} /> :
          List.renderEmptyBlock()
        }
      </div>
    );
  }
}

List.propTypes = {
  users: PropTypes.any,
};

export default List;

