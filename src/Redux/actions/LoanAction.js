import axios from "axios";
import { toast } from "react-toastify";

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

const URL = "http://localhost:1234";

export const GetAllLoan = () => {
  return (dispatch) => {
    dispatch({
      type: LOAN_MAKE_REQ,
    });
    setTimeout(() => {
      axios
        .get(`${URL}/loan/all`)
        .then((res) => {
          const _list = res.data;
          dispatch({
            type: LOAN_REQ_GETALL_SUCC,
            payload: _list,
          });
        })
        .catch((err) => {
          dispatch({
            type: LOAN_REQ_GETALL_FAIL,
            payload: err,
          });
        });
    }, 1000);
  };
};

export const GetLoanById = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/loan/detail`, data)
      .then((res) => {
        if (res.status) {
          dispatch({
            type: LOAN_REQ_GETBYCODE_SUCC,
            payload: data,
          });
        }
      })
      .catch((err) => {
        toast.error("Failed to create Loan due to :" + err.message);
      });
  };
};

export const CreateLoan = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/loan/save`, data)
      .then((res) => {
        dispatch({
          type: LOAN_REQ_ADD_SUCC,
          payload: data,
        });
        toast.success("Loan created successfully.");
      })
      .catch((err) => {
        toast.error("Failed to create Loan due to :" + err.message);
      });
  };
};

export const UpdateLoan = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/loan/edit`, data)
      .then((res) => {
        dispatch({
          type: LOAN_REQ_UPDATE_SUCC,
          payload: data,
        });
        toast.success("Loan updated successfully.");
      })
      .catch((err) => {
        toast.error("Failed to update Loan due to :" + err.message);
      });
  };
};

export const RemoveLoan = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/loan/delete`, data)
      .then((res) => {
        dispatch({
          type: LOAN_REQ_DELETE_SUCC,
          payload: data,
        });
        toast.success("Loan Removed successfully.");
      })
      .catch((err) => {
        toast.error("Failed to remove Loan due to :" + err.message);
      });
  };
};

export const OpenPopup = () => {
  return {
    type: LOAN_OPEN_POPUP,
  };
};
