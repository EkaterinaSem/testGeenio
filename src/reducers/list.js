import * as ACTIONS from 'constants/actions';

const initialState = {
  users: [],
  total_count: 0,
  errors: {}
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.REQUEST_USERS_LIST_SUCCESS:
      return {...state, ...action.payload};
    case ACTIONS.REQUEST_USER_CREATE_SUCCESS:
      const copyUsers = [...state.users];
      copyUsers.push(action.payload.user);
      return {...state, users: copyUsers, total_count: state.total_count++};
    case ACTIONS.REQUEST_USER_SEARCH_SUCCESS:
      return {...state,
        users: action.payload.users,
        total_count: action.payload.users.length,
      };
    case ACTIONS.REQUEST_USER_DELETE_SUCCESS:
      let usersAfterDelete = [...state.users];
      usersAfterDelete = usersAfterDelete.filter((user) => {
        return user.id !== action.payload.users.id;
      });
      return {...state,
        users: usersAfterDelete,
        total_count: state.total_count--,
      };
    case ACTIONS.REQUEST_USER_EDIT_SUCCESS:
      let usersAfterEdit = [...state.users];
      for (let i = 0; i < usersAfterEdit.length; i++) {
        if (usersAfterEdit[i].id === action.payload.user.id) {
          usersAfterEdit[i] = action.payload.user;
        }
      }
      return {...state,
        users: usersAfterEdit,
      };
    case ACTIONS.REQUEST_USER_CREATE_FAIL:
    case ACTIONS.REQUEST_USER_DELETE_FAIL:
    case ACTIONS.REQUEST_USER_EDIT_FAIL:
      return {...state, errors: action.payload.errors};
    case ACTIONS.CLEAR_ERRORS:
      return {...state, errors: {}};
    default:
      return state;
  }
};


export default list;