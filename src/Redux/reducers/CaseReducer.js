// Initial state definition
const initialStateOne = {
  isLoading: false,
  oneList: [],
  errorMessage: "",
};

const initialStateTwo = {
  isLoading: false,
  twoList: [],
  errorMessage: "",
};

const initialStateThree = {
  isLoading: false,
  threeList: [],
  errorMessage: "",
};

const CaseOneReducer = (state = initialStateOne, action) => {
  switch (action.type) {
    case "GET_CASE_ONE":
      return { ...state, isLoading: true };

    case "GET_CASE_ONE_SUCC":
      return { ...state, isLoading: false, oneList: action.payload };

    case "GET_CASE_ONE_FAIL":
      return { ...state, isLoading: false, oneList: [], errorMessage: action.payload };

    default:
      return state;
  }
};

const CaseTwoReducer = (state = initialStateTwo, action) => {
  switch (action.type) {
    case "GET_CASE_TWO":
      return { ...state, isLoading: true };

    case "GET_CASE_TWO_SUCC":
      return { ...state, isLoading: false, twoList: action.payload };

    case "GET_CASE_TWO_FAIL":
      return { ...state, isLoading: false, twoList: [], errorMessage: action.payload };

    default:
      return state;
  }
};

const CaseThreeReducer = (state = initialStateThree, action) => {
  switch (action.type) {
    case "GET_CASE_THREE":
      return { ...state, isLoading: true };

    case "GET_CASE_THREE_SUCC":
      return { ...state, isLoading: false, threeList: action.payload };

    case "GET_CASE_THREE_FAIL":
      return { ...state, isLoading: false, threeList: [], errorMessage: action.payload };

    default:
      return state;
  }
};

export { CaseOneReducer, CaseTwoReducer, CaseThreeReducer };
