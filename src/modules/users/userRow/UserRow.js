import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'modules/button/Button';
import api from 'api/users';

import '../users.css';

class UserRow extends Component {

  state = {
    isEdit: false,
    user: {
      id: this.props.user.id,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      email: this.props.user.email,
      phone: this.props.user.phone,
      about: this.props.user.about,
    }
  };

  onDelete() {
    const {user: {id}} = this.props;
    this.context.updateAfterDelete(id);
    api.deleteUser(id);
  }

  onEdit() {
    this.setState({
      isEdit: true,
    })
  }

  onCancelEdit() {
     this.setInitialState();
  }

  setInitialState(nextProps) {
    if (nextProps) {
      this.setState({
        isEdit: false,
        user: {
          nextProps,
        }
      })
    } else {
      this.setState({
        isEdit: false,
        user: {
          id: this.props.user.id,
          first_name: this.props.user.first_name,
          last_name: this.props.user.last_name,
          email: this.props.user.email,
          phone: this.props.user.phone,
          about: this.props.user.about,
        }
      });
    }
  }

  onSave() {
     this.toggleIsEdit();
     const {user} = this.state;
     api.editUser(user);
     this.context.updateAfterEdit(user);
  }

  toggleIsEdit() {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  }

  onInputChange(e) {
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [e.target.name]: e.target.value
      }
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isEdit: false,
      user: nextProps.user,
    })
  }

  render() {
   const { isEdit, user } = this.state;

   return (
     <div className="user-row">
       <div className="user-data id">
         <span>{user.id}</span>
       </div>
       <div className="user-data first-name">
        { isEdit ?
          <input name="first_name" value={user.first_name} onChange={this.onInputChange.bind(this)} /> :
          <span>{user.first_name}</span> }
       </div>
       <div className="user-data last-name">
        { isEdit ?
          <input name="last_name" value={user.last_name} onChange={this.onInputChange.bind(this)} /> :
          <span>{user.last_name}</span> }
       </div>
       <div className="user-data email">
        { isEdit ?
          <input name="email" value={user.email} onChange={this.onInputChange.bind(this)} /> :
          <span>{user.email}</span> }
       </div>
       <div className="user-data phone">
        { isEdit ?
          <input name="phone" value={user.phone} onChange={this.onInputChange.bind(this)} /> :
          <span>{user.phone}</span> }
       </div>
       <div className="user-data about">
        { isEdit ?
          <input name="about" value={user.about} onChange={this.onInputChange.bind(this)} /> :
          <span>{user.about}</span> }
       </div>
       <div className="user-data buttons">
         { isEdit ?
          <Button customClass="cancel" onClick={this.onCancelEdit.bind(this)} /> :
          <Button customClass="edit" onClick={this.onEdit.bind(this)} /> }
         { isEdit ?
          <Button customClass="save" onClick={this.onSave.bind(this)} /> :
          <Button customClass="delete" onClick={this.onDelete.bind(this)} /> }
       </div>
     </div>
    );
  }
}

UserRow.contextTypes = {
  updateAfterDelete: PropTypes.func,
  updateAfterEdit: PropTypes.func,
};

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserRow;