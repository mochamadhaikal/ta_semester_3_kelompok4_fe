import axios from "axios";

const URL = "http://localhost:1234";

export const GetCaseOne = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_CASE_ONE",
    });
    setTimeout(() => {
      axios
        .get(`${URL}/cases/1`)
        .then((res) => {
          const _list = res.data;
          dispatch({
            type: "GET_CASE_ONE_SUCC",
            payload: _list,
          });
        })
        .catch((err) => {
          dispatch({
            type: "GET_CASE_ONE_FAIL",
            payload: err,
          });
        });
    }, 1000);
  };
};

export const GetCaseTwo = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_CASE_TWO",
    });
    setTimeout(() => {
      axios
        .get(`${URL}/cases/2`)
        .then((res) => {
          const _list = res.data;
          dispatch({
            type: "GET_CASE_TWO_SUCC",
            payload: _list,
          });
        })
        .catch((err) => {
          dispatch({
            type: "GET_CASE_TWO_FAIL",
            payload: err,
          });
        });
    }, 1000);
  };
};

export const GetCaseThree = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_CASE_THREE",
    });
    setTimeout(() => {
      axios
        .get(`${URL}/cases/3`)
        .then((res) => {
          const _list = res.data;
          dispatch({
            type: "GET_CASE_THREE_SUCC",
            payload: _list,
          });
        })
        .catch((err) => {
          dispatch({
            type: "GET_CASE_THREE_FAIL",
            payload: err,
          });
        });
    }, 1000);
  };
};
