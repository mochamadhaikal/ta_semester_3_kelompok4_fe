import {
  LOAN_MAKE_REQ,
  LOAN_OPEN_POPUP,
  LOAN_REQ_ADD_SUCC,
  LOAN_REQ_DELETE_SUCC,
  LOAN_REQ_GETALL_FAIL,
  LOAN_REQ_GETALL_SUCC,
  LOAN_REQ_GETBYCODE_SUCC,
  LOAN_REQ_UPDATE_SUCC,
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

// LoanReducer definition
const LoanReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAN_MAKE_REQ:
      return { ...state, isLoading: true };

    case LOAN_REQ_GETALL_SUCC:
      return { ...state, isLoading: false, companyList: action.payload };

    case LOAN_REQ_GETBYCODE_SUCC:
      return { ...state, companyObj: action.payload };

    case LOAN_REQ_GETALL_FAIL:
      return { ...state, isLoading: false, companyList: [], errorMessage: action.payload };

    case LOAN_OPEN_POPUP:
      return { ...state, companyObj: {} };

    case LOAN_REQ_ADD_SUCC:
      const newCompany = { ...action.payload, friendId: generateNewId(state.companyList) };
      return { ...state, companyList: [...state.companyList, newCompany] };

    case LOAN_REQ_UPDATE_SUCC:
      const updatedList = state.companyList.map((item) =>
        item.friendId === action.payload.friendId ? action.payload : item
      );
      return { ...state, companyList: updatedList };

    case LOAN_REQ_DELETE_SUCC:
      const filteredList = state.companyList.filter((item) => item.friendId !== action.payload);
      return { ...state, companyList: filteredList };

    default:
      return state;
  }
};

export default LoanReducer;
