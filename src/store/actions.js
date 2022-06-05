import axios from "axios";
import APP_CONFIG from "../../config/dev.json";

export const getCityList = ({ commit }) => {
  const URL = `${APP_CONFIG.apps.mockApi.hostname}/api/cities`;
  return new Promise((resolve, reject) => {
    axios(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        resolve(response);
        commit("GET_CITY_LIST", response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getJobList = ({ commit }) => {
  const URL = `${APP_CONFIG.apps.mockApi.hostname}/api/joblist`;
  return new Promise((resolve, reject) => {
    commit("LOADING_STATUS", true);
    axios(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        resolve(response);
        commit("GET_JOB_LIST", response.data);
        commit("LOADING_STATUS", false);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getJobDetail = ({ commit }, id) => {
  const URL = `${APP_CONFIG.apps.mockApi.hostname}/api/joblistdetail/${id}`;
  return new Promise((resolve, reject) => {
    commit("LOADING_STATUS", true);
    axios(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        resolve(response);
        commit("GET_JOB_DETAIL", response.data.items);
        commit("LOADING_STATUS", false);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setSelectCity = ({ commit }, payload) => {
  commit("SET_SELECT_CITY", payload);
};

export const setPagination = ({ commit }, payload) => {
  const { list, page } = payload,
    perPage = 2;

  let totalPage = 0,
    pageValue = page;

  totalPage = Math.ceil(list.length / perPage);

  if (pageValue > totalPage) pageValue = totalPage;

  const start = (pageValue - 1) * perPage,
    end = pageValue * perPage;

  const pagination = {
    totalPage: totalPage,
    page: page,
    pageList: list.slice(start, end),
  };

  commit("SET_PAGINATION", pagination);
};
