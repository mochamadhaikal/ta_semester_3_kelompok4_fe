import axios from "axios";
import { toast } from "react-toastify";

import {
  DVD_MAKE_REQ,
  DVD_OPEN_POPUP,
  DVD_REQ_ADD_SUCC,
  DVD_REQ_DELETE_SUCC,
  DVD_REQ_GETALL_FAIL,
  DVD_REQ_GETALL_SUCC,
  DVD_REQ_GETBYCODE_SUCC,
  DVD_REQ_UPDATE_SUCC,
} from "../ActionType";

const URL = "http://localhost:1234";

export const GetAllDvd = () => {
  return (dispatch) => {
    dispatch({
      type: DVD_MAKE_REQ,
    });
    setTimeout(() => {
      axios
        .get(`${URL}/dvd/all`)
        .then((res) => {
          const _list = res.data;
          dispatch({
            type: DVD_REQ_GETALL_SUCC,
            payload: _list,
          });
        })
        .catch((err) => {
          dispatch({
            type: DVD_REQ_GETALL_FAIL,
            payload: err,
          });
        });
    }, 1000);
  };
};

export const GetDvdById = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/dvd/detail`, data)
      .then((res) => {
        if (res.status) {
          dispatch({
            type: DVD_REQ_GETBYCODE_SUCC,
            payload: data,
          });
        }
      })
      .catch((err) => {
        toast.error("Failed to create Dvd due to :" + err.message);
      });
  };
};

export const CreateDvd = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/dvd/save`, data)
      .then((res) => {
        dispatch({
          type: DVD_REQ_ADD_SUCC,
          payload: data,
        });
        toast.success("Dvd created successfully.");
      })
      .catch((err) => {
        toast.error("Failed to create Dvd due to :" + err.message);
      });
  };
};

export const UpdateDvd = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/dvd/edit`, data)
      .then((res) => {
        dispatch({
          type: DVD_REQ_UPDATE_SUCC,
          payload: data,
        });
        toast.success("Dvd updated successfully.");
      })
      .catch((err) => {
        toast.error("Failed to update Dvd due to :" + err.message);
      });
  };
};

export const RemoveDvd = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/dvd/delete`, data)
      .then((res) => {
        dispatch({
          type: DVD_REQ_DELETE_SUCC,
          payload: data,
        });
        toast.success("Dvd Removed successfully.");
      })
      .catch((err) => {
        toast.error("Failed to remove Dvd due to :" + err.message);
      });
  };
};

export const OpenPopup = () => {
  return {
    type: DVD_OPEN_POPUP,
  };
};
