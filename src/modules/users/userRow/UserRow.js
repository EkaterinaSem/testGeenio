import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'modules/button/Button';
import * as actions from 'actions';

import '../users.css';

class UserRow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      user: {...this.props.user}
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const { user: {id}, dispatch } = this.props;
    dispatch(actions.deleteUser(id));
  }

  onEdit() {
    this.setState({
      isEdit: true,
    })
  }

  onCancelEdit() {
    this.setState({
      isEdit: false,
      user: {...this.props.user}
    });
  }

  onSave() {
     this.toggleIsEdit();
     const {user} = this.state;
    const { dispatch } = this.props;
    dispatch(actions.editUser(user));
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

       { (Object.keys(user).map((key) => {
         return (
           <div key={key} className={`user-data ${key}`}>
             { isEdit ?
               <input name={key} value={user[key]} onChange={this.onInputChange} /> :
               <span>{user[key]}</span> }
           </div>
         )
       })) }
       <div className="user-data buttons">
         { isEdit ?
          <Button customClass="cancel" onClick={this.onCancelEdit} /> :
          <Button customClass="edit" onClick={this.onEdit} /> }
         { isEdit ?
          <Button customClass="save" onClick={this.onSave} /> :
          <Button customClass="delete" onClick={this.onDelete} /> }
       </div>
     </div>
    );
  }
}


UserRow.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
};

export default connect(mapStateToProps)(UserRow);