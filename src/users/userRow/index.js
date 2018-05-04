import React, { Component } from 'react';
import '../styles.css';
import Button from '../../button';
import $ from "jquery";
import PropTypes from 'prop-types';

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
     this.setInitialState();
  }

  setInitialState(nextProps) {
    if (nextProps) {
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
    } else {
      this.setState({
        isEdit: false,
        user: {
          nextProps,
        }
      })
    }
  }

  onSave() {
     this.toggleIsEdit();
     const {user: {id}} = this.state;
     this.context.updateAfterEdit(this.state.user);
     return $.ajax({
       method: `PUT`,
       crossDomain: true,
       url: `https://geenio-test-job.herokuapp.com/api/v1/users/${id}?api_key=DVEXd6WRcc69cvXI`,
       dataType: `json`,
       data: this.state.user,
     });
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
    console.log("componentWillRecieveProps()", nextProps);
    this.setState({
      isEdit: false,
      user: nextProps.user,
    })
  }

  render() {
   const { isEdit, user } = this.state;
    console.log('user row ', this.state)
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
    updateAfterEdit: PropTypes.func,
};

export default UserRow;