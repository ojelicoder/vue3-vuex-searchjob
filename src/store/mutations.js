export const GET_CITY_LIST = (state, payload) => {
  state.cityList = payload;
};

export const GET_JOB_LIST = (state, payload) => {
  state.jobList = payload;
};

export const GET_JOB_DETAIL = (state, payload) => {
  state.jobDetail = payload;
  state.loading = false;
};

export const LOADING_STATUS = (state, payload) => {
  state.loading = payload;
};

export const SET_SELECT_CITY = (state, payload) => {
  state.searchData = payload;
};

export const SET_PAGINATION = (state, payload) => {
  state.pagination = payload;
};
