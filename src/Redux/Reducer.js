import {
  DVD_MAKE_REQ,
  DVD_OPEN_POPUP,
  DVD_REQ_ADD_SUCC,
  DVD_REQ_DELETE_SUCC,
  DVD_REQ_GETALL_FAIL,
  DVD_REQ_GETALL_SUCC,
  DVD_REQ_GETBYCODE_SUCC,
  DVD_REQ_UPDATE_SUCC,
} from "./ActionType";

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
  return Math.max(...companyList.map((company) => company.dvdId)) + 1;
};

// CompanyReducer definition
export const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case DVD_MAKE_REQ:
      return { ...state, isLoading: true };

    case DVD_REQ_GETALL_SUCC:
      return { ...state, isLoading: false, companyList: action.payload };

    case DVD_REQ_GETBYCODE_SUCC:
      return { ...state, companyObj: action.payload };

    case DVD_REQ_GETALL_FAIL:
      return { ...state, isLoading: false, companyList: [], errorMessage: action.payload };

    case DVD_OPEN_POPUP:
      return { ...state, companyObj: {} };

    case DVD_REQ_ADD_SUCC:
      const newCompany = { ...action.payload, dvdId: generateNewId(state.companyList) };
      return { ...state, companyList: [...state.companyList, newCompany] };

    case DVD_REQ_UPDATE_SUCC:
      const updatedList = state.companyList.map((item) =>
        item.dvdId === action.payload.dvdId ? action.payload : item
      );
      return { ...state, companyList: updatedList };

    case DVD_REQ_DELETE_SUCC:
      const filteredList = state.companyList.filter((item) => item.dvdId !== action.payload);
      return { ...state, companyList: filteredList };

    default:
      return state;
  }
};
