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

    //this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.toggleIsAddNew = this.toggleIsAddNew.bind(this);
    //this.onClickAddNew = this.onClickAddNew.bind(this);
  }

  toggleIsAddNew() {
    console.log('toggle')
    this.setState({
      isAddNew: !this.state.isAddNew,
    })
  }

  onClickCancel() {
    this.setState({
      isAddNew: false,
    })
  }


  render() {
    const {isAddNew} = this.state;

    return (
      <div className="main">
        <div className="head-wrapper">
          <div className="button-wrapper">
            <Button
              disabled={isAddNew}
              onClick={this.toggleIsAddNew}
            >Add new user
            </Button>
          </div>
          {isAddNew && <AddNew
            onClickCancelButton={this.toggleIsAddNew}
            onClickAddButton={this.toggleIsAddNew}
          />}
        </div>
        <List />
      </div>
    );
  }
}

export default MainBlock;