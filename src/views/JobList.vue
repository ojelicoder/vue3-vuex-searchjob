<script>
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import Pagination from "@/components/Pagination/index.vue";
import SearchJob from "@/components/SearchJob/index.vue";
import { useRouter } from "vue-router";

export default {
  name: "JobDetail",
  components: {
    Pagination,
    SearchJob,
  },
  setup() {
    const store = useStore(),
      router = useRouter();

    const paginationParams = {
      list: store.getters.searchJob,
      page: 1,
    };

    store.dispatch("setPagination", paginationParams);
    const state = reactive({
        searchJobResult: computed(() => store.getters.searchJob),
        searchData: computed(() => store.getters.search),
        pagination: computed(() => store.getters.pagination),
      }),
      cities = store.state.cityList,
      jobList = store.state.jobList;

    const gotoDetail = (id) => {
      router.push({ path: "/is-ilani", query: { id: id } });
    };

    return {
      state,
      cities,
      jobList,
      gotoDetail,
    };
  },
};
</script>

<template>
  <div class="jobs">
    <div class="jobs-header">
      <SearchJob currentPage="list" />
    </div>
    <div class="jobs-content">
      <div class="container">
        <h1 class="jobs-title">
          {{
            state.searchJobResult.length > 0
              ? `${state.searchJobResult.length} ${
                  state.searchData.city !== undefined
                    ? state.searchData.city
                    : ""
                } İş İlanları`
              : "Sonuç bulunamadı!"
          }}
        </h1>
        <div class="row">
          <div class="col-12">
            <div
              v-for="(job, i) in state.pagination.pageList"
              :key="i"
              class="jobs-item"
              @click="gotoDetail(job.id)"
            >
              <div class="jobs-item_content">
                <img
                  :src="job.imageUrl"
                  :alt="job.companyName"
                  class="jobs-item_img"
                />
                <div>
                  <h3 class="jobs-item_positionname">{{ job.positionName }}</h3>
                  <p class="jobs-item_companyname">{{ job.companyName }}</p>
                  <p class="jobs-item_cityname">{{ job.cityName }}</p>
                </div>
              </div>
              <div class="jobs-item_footer">
                <span>{{ job.durationDayText }}</span>
              </div>
            </div>
            <Pagination
              v-if="state.searchJobResult.length > 0"
              :list="state.searchJobResult"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/variables.scss";

@mixin searchInputStyle {
  border: 1px solid #c2c2c2;
  height: 35px;
  font-size: 15px;

  &:focus-visible {
    outline: none;
  }
}
.jobs {
  color: $color-carbon;
  &-select {
    &_city {
      @include searchInputStyle();
      width: 200px;
      margin: 0 10px;
      color: $black;
      cursor: pointer;

      @media screen and (max-width: $screenxs) {
        width: 100%;
        margin: 20px 0 0;
      }
    }
  }

  &-input {
    @include searchInputStyle();
    width: 400px;
    border-left: 1px solid $color-steam;
    padding-left: 10px;

    @media screen and (max-width: $screenxs) {
      width: 100%;
    }

    &_wrapper {
      @include flex(null, row-reverse);

      @media screen and (max-width: $screenxs) {
        @include flex(null, column-reverse);
        width: 100%;
      }
    }
  }

  &-list {
    &-search {
      &_btn {
        background-color: $color-pheromone-purple;
        color: $white;
        height: 35px;
        border: 0;
        border-radius: 5px;
        padding: 0 25px;
        font-weight: bold;
        cursor: pointer;

        @media screen and (max-width: $screenxs) {
          margin: 20px 0 0;
        }
      }
    }
  }

  &-content {
    margin-top: 20px;
    background-color: #f9f9f9;
    box-shadow: 0px 43px 74px -49px rgb(202 202 202 / 75%) inset;
  }

  &-title {
    font-size: 1.25rem;
    padding: 20px 0;
  }

  &-item {
    background-color: $white;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 1px 5px 0 rgb(0 0 0 / 10%);
    cursor: pointer;

    + .jobs-item {
      margin-top: 15px;
    }

    &_img {
      height: 48px;
      width: 48px;
      border: 1px solid $color-steam;
      object-fit: cover;
      margin-right: 15px;
    }
    &_positionname {
      font-weight: bold;
      font-size: 16px;
    }
    &_companyname {
      font-size: 12px;
      margin: 3px 0 8px;
    }
    &_cityname {
      font-size: 12px;
    }
    &_content {
      display: flex;
    }
    &_footer {
      display: flex;
      justify-content: right;
      font-size: 14px;
      margin: 15px 0;
    }
  }
}
</style>
