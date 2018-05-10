import * as ACTIONS from 'constants/actions';

const initialState = {
  users: [],
  total_count: 0,
  isAddNew: false,
  isSearch: false,
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.REQUEST_USERS_LIST_SUCCESS:
      return {...state, ...action.payload};
    case ACTIONS.REQUEST_USER_CREATE_SUCCESS:
      const copyUsers = [...state.users];
      copyUsers.push(action.payload.user);
      return {...state, users: copyUsers};
    case ACTIONS.REQUEST_USER_SEARCH_SUCCESS:
      return {...state,
        users: action.payload.users,
        total_count: action.payload.length,
      };
    case ACTIONS.REQUEST_USER_DELETE_SUCCESS:
      let usersAfterDelete = [...state.users];
      console.log('filter ',usersAfterDelete, action.payload.user.id)
      usersAfterDelete = usersAfterDelete.filter((user) => {

        return user.id !== action.payload.user.id;
      });
      return {...state,
        users: usersAfterDelete,
      };
    default:
      return state;
  }
};


export default list;