import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';

import Modal from "modules/modal/Modal";
import Button from 'modules/button/Button';
import List from 'modules/list/List';
import AddNewContainer from 'containers/addNewContainer';
import SearchContainer from 'containers/searchContainer';
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
    this.changePage = this.changePage.bind(this);
    this.onModalClick = this.onModalClick.bind(this);
  }

  showAddNew () {
    const { dispatch } = this.props;
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

  onModalClick () {
    const { dispatch } = this.props;
    dispatch(actions.clearErrors());
  }

  render() {
    const { list: { users, total_count, errors }, ui: { isAddNew, isSearch } } = this.props;
    const { activePage } = this.state;
    return (
      <div className="main">
        { errors.error && <Modal error={errors.error} onModalClick={this.onModalClick}/> }
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
          {isAddNew && <AddNewContainer offset={activePage} />}
          {isSearch && <SearchContainer />}
        </div>
        <List users={users}/>
        <Pagination
          hideFirstLastPages
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={total_count}
          pageRangeDisplayed={5}
          onChange={this.changePage}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    list: state.list,
    ui: state.ui,
  }
};

export default connect(mapStateToProps)(MainBlock);