<script>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Loading from "@/components/Loading/index.vue";

export default {
  name: "SearchJob",
  components: {
    Loading,
  },
  props: {
    currentPage: String,
  },
  setup(props) {
    const store = useStore(),
      state = reactive({
        jobList: [],
        cities: [],
        selectedCity: "",
        selectedJob: "",
        job: props.currentPage === "list" ? store.state.searchData.job : "",
        city: props.currentPage === "list" ? store.state.searchData.city : "",
        loading: computed(() => store.getters.loadingStatus),
      }),
      router = useRouter();

    store.dispatch("getCityList");
    state.cities = computed(() => store.getters.cityList);

    store.dispatch("getJobList");
    state.jobList = computed(() => store.getters.jobList);

    const gotoJobList = () => {
      const { selectedJob, selectedCity } = state,
        search = {
          job: selectedJob,
          city: selectedCity,
        };
      store.dispatch("setSelectCity", search);

      const searchJobResult = store.getters.searchJob,
        paginationParams = {
          list: searchJobResult,
          page: 1,
        };
      store.dispatch("setPagination", paginationParams);
      computed(() => store.getters.pagination);

      router.push("/is-ilanlari");
    };

    const home = props.currentPage === "home",
      list = props.currentPage === "list";

    return {
      state,
      gotoJobList,
      home,
      list,
    };
  },
};
</script>

<template>
  <div :class="{ 'search' : home, '': list }" v-if="!state.loading">
    <div class="container">
      <div class="col-12">
        <h1 v-if="home" class="search-title">
          {{ `Senin için burada ${state.jobList.length} ilan var!` }}
        </h1>
        <div class="search-wrapper">
          <div
            :class="{
              'search-input_wrapper': home,
              'jobs-input_wrapper': list,
            }"
          >
            <select
              name=""
              placeholder="Şehir"
              :class="{ 'search-select_city': home, 'jobs-select_city': list }"
              id=""
              @change="state.selectedCity = $event.target.value"
              :value="state.city"
            >
              <option value="" disabled selected>Şehir</option>
              <option v-for="(city, i) in state.cities" :key="i">
                {{ city.name }}
              </option>
            </select>
            <input
              @keyup="state.selectedJob = $event.target.value"
              @keyup.enter="gotoJobList()"
              placeholder="Pozisyon, firma adı, sektör"
              :class="{ 'search-input_job': home, 'jobs-input': list }"
              :value="state.job"
            />
          </div>
          <button
            @click="gotoJobList"
            :class="{ 'search-btn': home, 'jobs-list-search_btn': list }"
          >
            İŞ BUL
          </button>
        </div>
      </div>
    </div>
  </div>
  <Loading v-else />
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

@mixin searchInputStyle {
  border: 0;
  height: 46px;
  font-size: 18px;

  &:focus-visible {
    outline: none;
  }
}
.search {
  background-color: $color-pheromone-purple;
  padding: 100px 0;

  &-wrapper {
    @include flex(center);
    @media screen and (max-width: $screenxs) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &-title {
    color: $white;
    margin-bottom: 20px;
  }

  &-select {
    &_city {
      @include searchInputStyle();
      width: 200px;
      margin-right: 20px;
      color: $black;
      cursor: pointer;

      @media screen and (max-width: $screenxs) {
        width: 100%;
        margin: 0 0 20px;
      }
    }
  }

  &-input {
    &_wrapper {
      @include flex(center);
      background-color: $white;
      padding: 10px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;

      @media screen and (max-width: $screenxs) {
        flex-direction: column;
        justify-content: left;
        border-radius: 5px;
        margin-bottom: 20px;
        width: 100%;
      }
    }
    &_job {
      @include searchInputStyle();
      width: 450px;
      border-left: 1px solid $color-steam;
      padding-left: 20px;
      height: 46px;

      @media screen and (max-width: $screenxs) {
        width: 100%;
        padding-left: 0;
        border-left: 0;
        border-top: 1px solid $color-steam;
      }
    }
  }

  &-btn {
    background-color: $color-ufo-green;
    color: $white;
    cursor: pointer;
    border: 0;
    font-weight: bold;
    border-radius: 2px;
    padding: 20px;
    line-height: 20px;
    height: auto;
    font-size: 18px;
  }
}
</style>
