import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';

import Button from 'modules/button/Button';
import List from 'modules/list/List';
import AddNew from 'modules/addNew/AddNew';
import Search from 'modules/search/Search';
import * as actions from 'actions';

import './mainBlock.css';


class MainBlock extends Component {

  constructor (props){
    super(props);
    this.state = {
      activePage: 1,
      isAddNew: false,
      isSearch: false,
      users: {},
    };

    this.onClickCancel = this.onClickCancel.bind(this);
    this.toggleIsAddNew = this.toggleIsAddNew.bind(this);
    this.uploadAfterCreate = this.uploadAfterCreate.bind(this);
    this.updateAfterDelete = this.updateAfterDelete.bind(this);
    this.updateAfterEdit = this.updateAfterEdit.bind(this);
    this.toggleIsSearch = this.toggleIsSearch.bind(this);
    this.updateAfterSearch = this.updateAfterSearch.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  getChildContext() {
    return {
      updateAfterDelete: this.updateAfterDelete,
      updateAfterEdit: this.updateAfterEdit,
    };
  }

  updateAfterDelete(id) {
    // const {users} = this.state;
    // const newUsersList = {
    //     total_count: users.total_count - 1,
    //     users: users.users.filter((user) => {
    //         return user.id !== id;
    //     })
    // };
    // this.setState({
    //     users: newUsersList,
    // });
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
    // this.setState({
    //   users: {
    //     total_count: user.users.length,
    //     users: user.users
    //   }
    // });
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

  getAllUsers () {
    const { dispatch } = this.props;
    dispatch(actions.getAllUsers());
  }

  componentWillMount () {
    this.getAllUsers();
  }

  uploadAfterCreate() {
    const {activePage} = this.state;
    this.getAllUsers(activePage);
    //делаем перезагрузку списка. в противном случае не будет ID у нового юзера
  }

  // setCurrentPage(number) {
  //   this.setState({
  //     activePage: number,
  //   })
  // }

  // handlePageChange(e) {
  //   this.setState({
  //     activePage: e,
  //   });
  //   console.log('e ',this.state.activePage);
  // }

  render() {
    const { list: { users } } = this.props;
    const { isAddNew, isSearch, activePage } = this.state;

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
              customClass="right-btn"
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
        {/*<Pagination*/}
          {/*hideFirstLastPages*/}
          {/*activePage={activePage}*/}
          {/*itemsCountPerPage={10}*/}
          {/*totalItemsCount={users.total_count}*/}
          {/*pageRangeDisplayed={5}*/}
          {/*onChange={(e) => {*/}
            {/*this.setState({*/}
              {/*activePage: e,*/}
            {/*});*/}
            {/*this.getAllUsers(e);// ПОТЕРЯ КОНТЕКСТА*/}
          {/*}}*/}
        {/*/>*/}
      </div>
    );
  }
}

MainBlock.childContextTypes = {
  updateAfterDelete: PropTypes.func,
  updateAfterEdit: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log('main state ',state)
  return {
    list: state.list
  }
};

export default connect(mapStateToProps)(MainBlock);