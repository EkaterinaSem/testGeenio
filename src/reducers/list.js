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
      const searchedUsers = [...state.users];
      searchedUsers.push(action.payload.users);
      return {...state, users: searchedUsers};
    default:
      return state;
  }
};


export default list;