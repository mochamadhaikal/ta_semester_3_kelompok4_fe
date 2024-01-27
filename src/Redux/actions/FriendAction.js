import axios from "axios";
import { toast } from "react-toastify";

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

const URL = "http://localhost:1234";

export const GetAllFriend = () => {
  return (dispatch) => {
    dispatch({
      type: FRIEND_MAKE_REQ,
    });
    setTimeout(() => {
      axios
        .get(`${URL}/friend/all`)
        .then((res) => {
          const _list = res.data;
          dispatch({
            type: FRIEND_REQ_GETALL_SUCC,
            payload: _list,
          });
        })
        .catch((err) => {
          dispatch({
            type: FRIEND_REQ_GETALL_FAIL,
            payload: err,
          });
        });
    }, 1000);
  };
};

export const GetFriendById = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/friend/detail`, data)
      .then((res) => {
        if (res.status) {
          dispatch({
            type: FRIEND_REQ_GETBYCODE_SUCC,
            payload: data,
          });
        }
      })
      .catch((err) => {
        toast.error("Failed to create Friend due to :" + err.message);
      });
  };
};

export const CreateFriend = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/friend/save`, data)
      .then((res) => {
        dispatch({
          type: FRIEND_REQ_ADD_SUCC,
          payload: data,
        });
        toast.success("Friend created successfully.");
      })
      .catch((err) => {
        toast.error("Failed to create Friend due to :" + err.message);
      });
  };
};

export const UpdateFriend = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/friend/edit`, data)
      .then((res) => {
        dispatch({
          type: FRIEND_REQ_UPDATE_SUCC,
          payload: data,
        });
        toast.success("Friend updated successfully.");
      })
      .catch((err) => {
        toast.error("Failed to update Friend due to :" + err.message);
      });
  };
};

export const RemoveFriend = (data) => {
  return (dispatch) => {
    axios
      .post(`${URL}/friend/delete`, data)
      .then((res) => {
        dispatch({
          type: FRIEND_REQ_DELETE_SUCC,
          payload: data,
        });
        toast.success("Friend Removed successfully.");
      })
      .catch((err) => {
        toast.error("Failed to remove Friend due to :" + err.message);
      });
  };
};

export const OpenPopup = () => {
  return {
    type: FRIEND_OPEN_POPUP,
  };
};
