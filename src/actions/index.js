import api from 'api/users';
import * as ACTIONS from 'constants/actions';


export const getAllUsers = (offset) => {
  return (dispatch) => {
    api.getAllUsers(offset)
      .then((data) => {
        dispatch({
          type: ACTIONS.REQUEST_USERS_LIST_SUCCESS,
          payload: data
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTIONS.REQUEST_USERS_LIST_FAIL,
          payload: {
            errors: error.responseJSON
          }
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
      .catch((error) => {
        dispatch({
          type: ACTIONS.REQUEST_USER_CREATE_FAIL,
          payload: {
            errors: error.responseJSON
          }
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
      .catch((error) => {
        dispatch({
          type: ACTIONS.REQUEST_USER_SEARCH_FAIL,
          payload: {
            errors: error.responseJSON
          }
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
    .catch((error) => {
      dispatch({
        type: ACTIONS.REQUEST_USER_DELETE_FAIL,
        payload: {
          errors: error.responseJSON
        }
      });
    })
  }
};

export const showAddNew = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.SHOW_ADD_NEW,
    });
  }
};

export const hideAddNew = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.HIDE_ADD_NEW,
    });
  }
};

export const showSearch = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.SHOW_SEARCH,
    });
  }
};

export const hideSearch = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.HIDE_SEARCH,
    });
  }
};

export const hideModal = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.HIDE_MODAL,
    });
  }
};

export const editUser = (user) => {
  return (dispatch) => {
    api.editUser(user)
      .then((user) => {
        dispatch({
          type: ACTIONS.REQUEST_USER_EDIT_SUCCESS,
          payload: {
            user: user
          }
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTIONS.REQUEST_USER_EDIT_FAIL,
          payload: {
            errors: error.responseJSON
          }
        });
      })
  }
}
