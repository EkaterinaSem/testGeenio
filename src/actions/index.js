import api from 'api/users';
import * as ACTIONS from 'constants/actions';


export const getAllUsers = () => {
  return (dispatch) => {
    api.getAllUsers()
      .then((data) => {
        dispatch({
          type: ACTIONS.REQUEST_USERS_LIST_SUCCESS,
          payload: data
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.REQUEST_USERS_LIST_SUCCESS,
        });
      })
  }
};


export const createUser = (data) => {
  return (dispatch) => {
    api.createUser(data)
      .then((user) => {
        dispatch({
          type: ACTIONS.REQUEST_USER_CREATE_SUCCESS,
          payload: {
            user: user
          }
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.REQUEST_USER_CREATE_FAIL,
        });
      })
  }
};

export const searchUser = (data) => {
  return (dispatch) => {
    api.searchUser(data)
      .then((users) => {
        dispatch({
          type: ACTIONS.REQUEST_USER_SEARCH_SUCCESS,
          payload: {
            users: users.users
          }
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.REQUEST_USER_SEARCH_FAIL,
        });
      })
  }
};

export const deleteUser = (id) => {
  return (dispatch) => {
    api.deleteUser(id)
    .then((users) => {
      dispatch({
        type: ACTIONS.REQUEST_USER_DELETE_SUCCESS,
        payload: {
          users: users
        }
      });
    })
    .catch(() => {
      dispatch({
        type: ACTIONS.REQUEST_USER_DELETE_FAIL,
      });
    })
  }
};