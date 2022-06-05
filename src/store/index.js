import { createStore } from "vuex";
import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters.js";

export const store = createStore({
  state: {
    cityList: [],
    jobList: [],
    jobDetail: [],
    searchData: {},
    pagination: {},
    loading: false,
  },
  getters,
  mutations,
  actions,
});

export default store;
