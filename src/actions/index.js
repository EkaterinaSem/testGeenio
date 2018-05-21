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


function dataFormatted(data) {
  const newData = {...data};
  newData.first_name = data.first_name + Date.now();
  newData.last_name = data.last_name + Date.now();
  newData.email = data.email + Date.now();
  newData.phone = data.phone + Date.now();
  return newData;
}


function requestInterval(count, timeout, func) {
  let currentIteration = 0;
  const intervalId = setInterval(() => {
    func();
    currentIteration++;
    if(currentIteration >= count) {
      clearInterval(intervalId);
    }
  }, timeout)
}


export const createUser = (data, successCallback = () => {}) => {
  return (dispatch) => {
    requestInterval(10, 1000, () => {
      api.createUser(dataFormatted(data))
        .then((user) => {
          dispatch({
            type: ACTIONS.REQUEST_USER_CREATE_SUCCESS,
            payload: {
              user: user
            }
          });
          successCallback();
        })
        .catch((error) => {
          dispatch({
            type: ACTIONS.REQUEST_USER_CREATE_FAIL,
            payload: {
              errors: error.responseJSON
            }
          });
        })
    });
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

export const clearErrors = () => {
  return (dispatch) => {
    dispatch({
      type: ACTIONS.CLEAR_ERRORS,
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
