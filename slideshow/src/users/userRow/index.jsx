import React, { Component } from 'react';
import '../styles.css';
import Button from '../../button';
import $ from "jquery";
import PropTypes from 'prop-types';

class UserRow extends Component {

  state = {
    isEdit: false,
  }

  onDelete() {
    const {user: {id}} = this.props;
    this.context.updateAfterDelete(id);
    return $.ajax({
      method: `DELETE`,
      crossDomain: true,
      url: `https://geenio-test-job.herokuapp.com/api/v1/users/${id}?api_key=DVEXd6WRcc69cvXI`,
      dataType: `json`,
    });
  }

  onEdit() {
    this.setState({
        isEdit: true,
    })
  }

  onCancelEdit() {
    this.setState({
        isEdit: false,
    })
  }

  onSave() {
      this.setState({
          isEdit: false,
      })
    }

  render() {
   const  { user } = this.props;
   const { isEdit } = this.state;

   return (
     <div className="user-row">
       <div className="user-data id">
         <span>{user.id}</span>
       </div>
       <div className="user-data first-name">
        { isEdit ? <input value={user.first_name} /> : <span>{user.first_name}</span> }
       </div>
       <div className="user-data last-name">
        { isEdit ? <input value={user.last_name} /> : <span>{user.last_name}</span> }
       </div>
       <div className="user-data email">
        { isEdit ? <input value={user.email} /> : <span>{user.email}</span> }
       </div>
       <div className="user-data phone">
        { isEdit ? <input value={user.phone} /> : <span>{user.phone}</span> }
       </div>
       <div className="user-data about">
        { isEdit ? <input value={user.about} /> : <span>{user.about}</span> }
       </div>
       <div className="user-data buttons">
         { isEdit ?
            <Button cls="cancel" onClick={this.onCancelEdit.bind(this)} /> :
            <Button cls="edit" onClick={this.onEdit.bind(this)} /> }
         { isEdit ?
            <Button cls="save" onClick={this.onSave.bind(this)} /> :
            <Button cls="delete" onClick={this.onDelete.bind(this)} /> }
       </div>
     </div>
    );
  }
}

UserRow.contextTypes = {
    updateAfterDelete: PropTypes.func,
};

export default UserRow;