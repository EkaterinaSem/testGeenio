import * as ACTIONS from 'constants/actions';

const initialState = {
  isAddNew: false,
  isSearch: false,
  showModal: false,
};

const ui = (state = initialState, action) => {
  switch (action.type) {

    case ACTIONS.SHOW_ADD_NEW:
      return {...state, isAddNew: true, isSearch: false};
    case ACTIONS.HIDE_ADD_NEW:
      return {...state, isAddNew: false};
    case ACTIONS.SHOW_SEARCH:
      return {...state, isAddNew: false, isSearch: true};
    case ACTIONS.HIDE_SEARCH:
      return {...state, isSearch: false};
    case ACTIONS.SHOW_MODAL:
      return {...state, showModal: true};
    case ACTIONS.HIDE_MODAL:
      return {...state, showModal: false, errors: {}};
    default:
      return state;
  }
};


export default ui;