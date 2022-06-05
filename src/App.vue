<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <main>
    <div class="container">
      <img class="logo" :width="200" alt="logo" src="../src/assets/logo.webp" />
    </div>
    <RouterView />
  </main>
</template>

<style lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/base.scss";
</style>
