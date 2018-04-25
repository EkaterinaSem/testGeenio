import React, { Component } from 'react';
import './styles.css'
import Button from '../button';
import List from '../list';
import AddNew from '../addNew';
import $ from "jquery";

class MainBlock extends Component {

  constructor (props){
    super(props);
    this.state = {
      isAddNew: false,
      users: [],
    };

    //this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.toggleIsAddNew = this.toggleIsAddNew.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    //this.onClickAddNew = this.onClickAddNew.bind(this);
    this.uploadAfterCreate = this.uploadAfterCreate.bind(this);
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
        })
    );
  }
    componentWillMount () {
        this.setState({
            users: this.getAllUsers(),
        });
    }

    uploadAfterCreate(user) {
        const usersList = this.state.users.users;
        usersList.push(user);
        this.setState({
            users: {
                users: usersList,
            }
        });
    }

  render() {
    const {isAddNew, users} = this.state;
       console.log('users ',this.state);
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
            uploadAfterCreate={this.uploadAfterCreate}
          />}
        </div>
        <List users={users}/>
      </div>
    );
  }
}

export default MainBlock;