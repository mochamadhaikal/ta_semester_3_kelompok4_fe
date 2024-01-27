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

export const makeRequest = () => {
  return {
    type: DVD_MAKE_REQ,
  };
};

export const getAllRequestSuccess = (data) => {
  return {
    type: DVD_REQ_GETALL_SUCC,
    payload: data,
  };
};

export const getAllRequestFail = (err) => {
  return {
    type: DVD_REQ_GETALL_FAIL,
    payload: err,
  };
};

export const OpenPopup = () => {
  return {
    type: DVD_OPEN_POPUP,
  };
};

export const AddRequest = (data) => {
  return {
    type: DVD_REQ_ADD_SUCC,
    payload: data,
  };
};

export const UpdateRequest = (data) => {
  return {
    type: DVD_REQ_UPDATE_SUCC,
    payload: data,
  };
};

export const RemoveRequest = (data) => {
  return {
    type: DVD_REQ_DELETE_SUCC,
    payload: data,
  };
};

export const getbycodeSuccess = (data) => {
  return {
    type: DVD_REQ_GETBYCODE_SUCC,
    payload: data,
  };
};
