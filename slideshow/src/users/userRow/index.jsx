import React, { Component } from 'react';
import '../styles.css';
import Button from '../../button';
import $ from "jquery";

class UserRow extends Component {

  onDelete() {
    const {user: {id}} = this.props;
    console.log('delete ', this.props)
    return $.ajax({
      method: `DELETE`,
      crossDomain: true,
      url: `https://geenio-test-job.herokuapp.com/api/v1/users/${id}?api_key=DVEXd6WRcc69cvXI`,
      dataType: `json`,
    });
    this.context.updateAfterDelete(id);
  }

  render() {
   const  { user } = this.props;

   return (
     <div className="user-row">
       <div className="user-data id">{user.id}</div>
       <div className="user-data first-name">{user.first_name}</div>
       <div className="user-data last-name">{user.last_name}</div>
       <div className="user-data email">{user.email}</div>
       <div className="user-data phone">{user.phone}</div>
       <div className="user-data about">{user.about}</div>
       <div className="user-data buttons">
         <Button cls="edit" />
         <Button cls="delete" onClick={this.onDelete.bind(this)} />
       </div>
     </div>
    );
  }
}

UserRow.contextTypes = {
  updateAfterDelete: React.PropTypes.func,
};

export default UserRow;