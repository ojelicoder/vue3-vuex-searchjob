<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

export default {
  name: "PaginationView",
  props: {
    list: Array,
  },
  setup(props) {
    const store = useStore();
    const paginationParams = {
      list: props.list,
      page: 1,
    };

    store.dispatch("setPagination", paginationParams);
    const state = reactive({
      list: props.list,
      pagination: computed(() => store.getters.pagination),
    });

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      pageCalc = (calc) => {
        let page = state.pagination.page;
        if (calc === "minus") {
          page = page - 1;
          scrollTop();
        } else if (calc === "plus") {
          page = page + 1;
          scrollTop();
        } else {
          page = calc;
          scrollTop();
        }

        const changePaginationParams = {
          list: props.list,
          page: page,
        };

        store.dispatch("setPagination", changePaginationParams);
      };

    return {
      state,
      scrollTop,
      pageCalc,
    };
  },
};
</script>

<template>
  <div class="pagination">
    <div
      v-if="state.pagination.page != 1"
      class="pagination_prev"
      @click="pageCalc('minus')"
    ></div>
    <div
      v-for="i in state.pagination.totalPage"
      :key="i"
      @click="pageCalc(i)"
      :class="{
        'pagination_page active': i == state.pagination.page,
        'pagination_page': i != state.pagination.page,
      }"
    >
      {{ i }}
    </div>
    <div
      v-if="state.pagination.page != state.pagination.totalPage"
      class="pagination_next"
      @click="pageCalc('plus')"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

@mixin itemStyle {
  cursor: pointer;
  margin: 5px;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

@mixin arrowIcon {
  border-bottom: 2px solid $color-pheromone-purple;
  display: inline-block;
  width: 8px;
  height: 8px;
  content: "";
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 25px 25px;

  &_page {
    @include itemStyle();
    color: $color-carbon;

    &.active {
      color: $white;
      background-color: $color-pheromone-purple;
      border-color: $color-pheromone-purple;
    }
  }
  &_next {
    @include itemStyle();

    &:after {
      @include arrowIcon();
      border-right: 2px solid $color-pheromone-purple;
      display: inline-block;
      transform: rotate(-45deg);
    }
  }
  &_prev {
    @include itemStyle();

    &:after {
      @include arrowIcon();
      border-left: 2px solid $color-pheromone-purple;
      transform: rotate(45deg);
    }
  }
}
</style>
