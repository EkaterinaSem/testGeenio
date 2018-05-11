import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';

import Modal from "modules/modal/Modal";
import Button from 'modules/button/Button';
import List from 'modules/list/List';
import AddNew from 'modules/addNew/AddNew';
import Search from 'modules/search/Search';
import * as actions from 'actions';

import './mainBlock.css';

class MainBlock extends Component {

  constructor (props) {
    super(props);
    this.state = {
      activePage: 1,
    };

    this.onClickCancel = this.onClickCancel.bind(this);
    this.showAddNew = this.showAddNew.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  showAddNew () {
    const { dispatch, list } = this.props;
    dispatch(actions.showAddNew());
  }

  showSearch () {
    const { dispatch } = this.props;
    dispatch(actions.showSearch());
  }

  onClickCancel () {
    this.setState({
      isAddNew: false,
    })
  }

  getAllUsers (offset) {
    const { dispatch } = this.props;
    dispatch(actions.getAllUsers(offset));
  }

  componentWillMount () {
    this.getAllUsers();
  }

  changePage (offset) {
    this.setState({
      activePage: offset,
    });
    this.getAllUsers(offset);
  }

  render() {
    const { list: { users, total_count, isAddNew, isSearch, errors, showModal } } = this.props;
    const { activePage } = this.state;

    return (
      <div className="main">
        { showModal && <Modal error={errors} /> }
        <div className="head-wrapper">
          <div className="button-wrapper">
            <Button
              disabled={isAddNew}
              onClick={this.showAddNew}
            >{'Добавить пользователя'}
            </Button>
            <Button
              customClass="right-btn"
              disabled={isSearch}
              onClick={this.showSearch}
            >
              {'Найти пользователя'}
            </Button>
          </div>
          {isAddNew && <AddNew />}
          {isSearch && <Search />}
        </div>
        <List users={users}/>
        <Pagination
          hideFirstLastPages
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={total_count}
          pageRangeDisplayed={5}
          onChange={(offset) => {
            this.changePage.call(this, offset);
          }}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    list: state.list,
  }
};

export default connect(mapStateToProps)(MainBlock);