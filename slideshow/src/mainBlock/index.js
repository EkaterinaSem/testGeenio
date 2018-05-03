import React, { Component } from 'react';
import './styles.css'
import Button from '../button/index';
import List from '../list/index';
import AddNew from '../addNew/index';
import $ from "jquery";
import PropTypes from 'prop-types';
import Search from '../modules/search';
import Pagination from "react-js-pagination";
//import api from '../api/users';

class MainBlock extends Component {

  constructor (props){
    super(props);
    this.state = {
      activePage: 1,
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
    this.setState({
      users: {
        total_count: user.users.length,
        users: user.users
      }
    });
  }

  toggleIsAddNew() {
    this.setState({
      isSearch: false,
      isAddNew: !this.state.isAddNew,
    })
  }

  toggleIsSearch() {
    this.setState({
      isAddNew: false,
      isSearch: !this.state.isSearch,
    });
    this.getAllUsers();
  }

  onClickCancel() {
    this.setState({
      isAddNew: false,
    })
  }

  getAllUsers(offset = 1) {
    return $.ajax({
      method:   `GET`,
      crossDomain: true,
      url:      `https://geenio-test-job.herokuapp.com/api/v1/users?api_key=DVEXd6WRcc69cvXI`,
      dataType: `json`,
      data: {
        offset: (offset - 1) * 10,
      }
    })
    .then((data) =>
      this.setState({
        users: data
      }));

  }

  componentWillMount () {
    // this.setState({
    //   users: api.getAllUsers(),
    // });
    console.log('mount')
    this.setState({
      users: this.getAllUsers(),
    });
  }

  uploadAfterCreate(user) {
    this.getAllUsers(this.state.activePage);
    //делаем перезагрузку списка. в противном случае не будет ID у нового юзера
  }

  setCurrentPage(number) {
    this.setState({
      activePage: number,
    })
  }

  // handlePageChange(e) {
  //   this.setState({
  //     activePage: e,
  //   });
  //   console.log('e ',this.state.activePage);
  // }

  render() {
    const {isAddNew, isSearch, users} = this.state;
    console.log('rebder state ',this.state.users)
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
        <Pagination
          hideFirstLastPages
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={users.total_count}
          pageRangeDisplayed={5}
          onChange={(e) => {
            this.setState({
              activePage: e,
            });
            this.getAllUsers(e);
          }}
        />
      </div>
    );
  }
}

MainBlock.childContextTypes = {
  updateAfterDelete: PropTypes.func,
  updateAfterEdit: PropTypes.func,
};

export default MainBlock;