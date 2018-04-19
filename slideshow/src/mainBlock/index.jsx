import React, { Component } from 'react';
import './styles.css'
import Button from '../button';
import List from '../list';
import AddNew from '../addNew';

class MainBlock extends Component {

  constructor (props){
    super(props);
    this.state = {
      isAddNew: false,
    };

    this.onClickAdd = this.onClickAdd.bind(this);
  }

  getChildContext() {
    return {
      toggleIsAddNew: this.toggleIsAddNew,
    };
  }

  toggleIsAddNew() {
    this.setState({
      isAddNew: !this.state.isAddNew,
    })
  }

  onClickAdd() {
    this.setState({
      isAddNew: true,
    })
  }

  onClickCancel() {
    this.setState({
      isAddNew: false,
    })
  }

  render() {
    const {isAddNew} = this.state;
    console.log(isAddNew)
    return (
      <div className="main">
        <div className="head-wrapper">
          <div className="button-wrapper">
            <Button
              disabled={isAddNew}
              onClick={this.onClickAdd}
            >Add new user
            </Button>
          </div>
          {isAddNew && <AddNew
            onClickCancel={this.onClickCancel}
          />}
        </div>
        <List />
      </div>
    );
  }
}

export default MainBlock;