import React, { Component } from 'react';
import './styles.css'
import Button from '../button/index';
import List from '../list/index';
import AddNew from '../addNew/index';
import $ from "jquery";
import PropTypes from 'prop-types';
import Search from '../modules/search';

class MainBlock extends Component {

  constructor (props){
    super(props);
    this.state = {
      isAddNew: false,
      isSearch: false,
      users: [],
    };

    this.onClickCancel = this.onClickCancel.bind(this);
    this.toggleIsAddNew = this.toggleIsAddNew.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.uploadAfterCreate = this.uploadAfterCreate.bind(this);
    this.updateAfterDelete = this.updateAfterDelete.bind(this);
    this.updateAfterEdit = this.updateAfterEdit.bind(this);
    this.toggleIsSearch = this.toggleIsSearch.bind(this);
    this.updateAfterSearch = this.updateAfterSearch.bind(this);
  }

  getChildContext() {
    return {
      updateAfterDelete: this.updateAfterDelete,
      updateAfterEdit: this.updateAfterEdit,
    };
  }

  updateAfterDelete(id) {
    const {users} = this.state;
    const newUsersList = {
        total_count: users.total_count - 1,
        users: users.users.filter((user) => {
            return user.id !== id;
        })
    };
    this.setState({
        users: newUsersList,
    });
  }

  updateAfterEdit(editedUser) {
    const {users: {users}} = this.state;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === editedUser.id) {
            users[i] = editedUser;
        }
    }
  }

  updateAfterSearch(user) {
    const searchedUser = [];
    searchedUser.push(user);
    this.setState({
      users: {
        total_count: 1,
        users: searchedUser
      }
    });
    console.log(this.state);
  }

  toggleIsAddNew() {
    console.log('toggle')
    this.setState({
      isAddNew: !this.state.isAddNew,
    })
  }

  toggleIsSearch() {
    console.log('toggle')
    this.setState({
      isSearch: !this.state.isSearch,
    });
    this.getAllUsers();
  }

  onClickCancel() {
    this.setState({
      isAddNew: false,
    })
  }

  getAllUsers() {
    return $.ajax({
      method:   `GET`,
      crossDomain: true,
      url:      `https://geenio-test-job.herokuapp.com/api/v1/users?api_key=DVEXd6WRcc69cvXI`,
      dataType: `json`,
    })
    .then((data) =>
      this.setState({
        users: data
      }));

  }

  componentWillMount () {
    this.setState({
      users: this.getAllUsers(),
    });
  }

  uploadAfterCreate(user) {
    this.getAllUsers();
    //делаем перезагрузку списка. в противном случае не будет ID у нового юзера
  }

  render() {
    const {isAddNew, isSearch, users} = this.state;
    console.log('users ', users)
    return (
      <div className="main">
        <div className="head-wrapper">
          <div className="button-wrapper">
            <Button
              disabled={isAddNew}
              onClick={this.toggleIsAddNew}
            >{'Добавить пользователя'}
            </Button>
            <Button
              cls="right-btn"
              disabled={isSearch}
              onClick={this.toggleIsSearch}
            >
              {'Найти пользователя'}
            </Button>
          </div>
          {isAddNew && <AddNew
            onClickCancelButton={this.toggleIsAddNew}
            onClickAddButton={this.toggleIsAddNew}
            uploadAfterCreate={this.uploadAfterCreate}
          />}
          {isSearch && <Search
            onClickCancelButton={this.toggleIsSearch}
            onClickSearchButton={this.toggleIsSearch}
            updateAfterSearch={this.updateAfterSearch}
          />}
        </div>
        <List users={users}/>
      </div>
    );
  }
}

MainBlock.childContextTypes = {
  updateAfterDelete: PropTypes.func,
  updateAfterEdit: PropTypes.func,
};

export default MainBlock;