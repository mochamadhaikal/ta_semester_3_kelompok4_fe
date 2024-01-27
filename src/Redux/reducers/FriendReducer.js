import {
  FRIEND_MAKE_REQ,
  FRIEND_OPEN_POPUP,
  FRIEND_REQ_ADD_SUCC,
  FRIEND_REQ_DELETE_SUCC,
  FRIEND_REQ_GETALL_FAIL,
  FRIEND_REQ_GETALL_SUCC,
  FRIEND_REQ_GETBYCODE_SUCC,
  FRIEND_REQ_UPDATE_SUCC,
} from "../ActionType";

// Initial state definition
const initialState = {
  isLoading: false,
  companyList: [],
  companyObj: {},
  errorMessage: "",
};

// Helper function to generate new ID for a company
const generateNewId = (companyList) => {
  if (companyList.length === 0) return 1;
  return Math.max(...companyList.map((company) => company.friendId)) + 1;
};

// FriendReducer definition
const FriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIEND_MAKE_REQ:
      return { ...state, isLoading: true };

    case FRIEND_REQ_GETALL_SUCC:
      return { ...state, isLoading: false, companyList: action.payload };

    case FRIEND_REQ_GETBYCODE_SUCC:
      return { ...state, companyObj: action.payload };

    case FRIEND_REQ_GETALL_FAIL:
      return { ...state, isLoading: false, companyList: [], errorMessage: action.payload };

    case FRIEND_OPEN_POPUP:
      return { ...state, companyObj: {} };

    case FRIEND_REQ_ADD_SUCC:
      const newCompany = { ...action.payload, friendId: generateNewId(state.companyList) };
      return { ...state, companyList: [...state.companyList, newCompany] };

    case FRIEND_REQ_UPDATE_SUCC:
      const updatedList = state.companyList.map((item) =>
        item.friendId === action.payload.friendId ? action.payload : item
      );
      return { ...state, companyList: updatedList };

    case FRIEND_REQ_DELETE_SUCC:
      const filteredList = state.companyList.filter((item) => item.friendId !== action.payload);
      return { ...state, companyList: filteredList };

    default:
      return state;
  }
};

export default FriendReducer;
