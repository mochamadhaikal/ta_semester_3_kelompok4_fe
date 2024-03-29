import DvdReducer from "./DvdReducer";
import FriendReducer from "./FriendReducer";
import LoanReducer from "./LoanReducer";
import { CaseOneReducer, CaseTwoReducer, CaseThreeReducer, ReportOneReducer, ReportTwoReducer } from "./CaseReducer";

const reducers = {
  dvd: DvdReducer,
  friend: FriendReducer,
  loan: LoanReducer,
  caseOne: CaseOneReducer,
  caseTwo: CaseTwoReducer,
  caseThree: CaseThreeReducer,
  reportOne: ReportOneReducer,
  reportTwo: ReportTwoReducer,
};

export default reducers;
