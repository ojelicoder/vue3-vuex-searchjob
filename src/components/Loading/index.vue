<script>
export default {
  name: "LoadingView",
};
</script>

<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid $color-pheromone-purple;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

  @media screen and (max-width: $screenxs) {
    width: 60px;
    height: 60px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &-wrapper {
    @include flex(center, column);
    position: absolute;
    z-index: 999;
    background: #fff;
    width: 100%;
    align-items: center;
    height: 100vh;
  }
}
</style>
