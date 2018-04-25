import React, { Component } from 'react';
import './styles.css';
import Users from '../users';


class List extends Component {

  //getAllUsers() {
  //  return $.ajax({
   //   method:   `GET`,
   //   crossDomain: true,
   //   url:      `https://geenio-test-job.herokuapp.com/api/v1/users?api_key=DVEXd6WRcc69cvXI`,
   //   dataType: `json`,
   // });

    // var data = {
    //   api_key: 'DVEXd6WRcc69cvXI',
    //   first_name: 'Имя1',
    //   last_name: 'Фамилия1',
    //   email: '244@.ru',
    //   phone: 89261834509
    // };
    //
    // return $.ajax({
    //   method:   `POST`,
    //   url:      `https://geenio-test-job.herokuapp.com/api/v1/users`,
    //   data: data,
    //   success: function(data){
    //     console.log('success')
    //   }
    // })
 //}

  static renderEmptyBlock(){
    return (
      <div className="empty-block">
        Список пуст
      </div>
    )
  }

  render() {
    const {users} = this.props;
    console.log(users.total_count);
    return (
      <div className={`list-wrapper ${users.total_count === 0 && 'empty'}`}>
        {users.total_count > 0 ? <Users users={users.users} /> :
          List.renderEmptyBlock()
        }
      </div>
    );
  }
}

export default List;

