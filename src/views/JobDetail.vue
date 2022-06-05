<script>
import { computed, reactive } from "vue";
import Loading from "@/components/Loading/index.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "JobDetail",
  components: {
    Loading,
  },
  setup() {
    const store = useStore(),
      router = useRouter(),
      state = reactive({
        detail: [],
        loading: computed(() => store.getters.loadingStatus),
      });

    store.dispatch("getJobDetail", router.currentRoute.value.query.id);
    state.detail = computed(() => store.getters.jobDetail);

    return {
      state,
      router,
    };
  },
};
</script>

<template>
  <div class="detail">
    <div class="container" v-if="!state.loading">
      <div class="col-12">
        <h1 class="detail-title">{{ state.detail.positionName }}</h1>
        <h3 class="detail-company">{{ state.detail.companyName }}</h3>
        <p class="detail-city">
          {{ `${state.detail.cityName}, ${state.detail.townName}` }}
        </p>
        <img
          :src="state.detail.imageUrl"
          :alt="state.detail.companyName"
          class="detail-img"
        />
        <p>{{ state.detail.description }}</p>
        <button class="detail-back" @click="router.go(-1)">
          Başka ilan ara
        </button>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.detail {
  color: $color-carbon;

  &-title {
    font-weight: 400;
  }

  &-company {
    margin-top: 5px;
  }

  &-city {
    font-size: 14px;
    margin-top: 10px;
  }

  &-img {
    @media screen and (max-width: $screenxs) {
      object-fit: cover;
      width: 100%;
    }
  }

  &-back {
    background-color: $color-pheromone-purple;
    color: $white;
    height: 35px;
    border: 0;
    border-radius: 5px;
    padding: 0 25px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
  }
}
</style>
