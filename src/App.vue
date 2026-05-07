<template>
  <ElConfigProvider namespace="agc">
    <main class="main-container">
      <AgcHeader />
      <RouterView />
    </main>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { AgcHeader } from '@/components/molecles/AgcHeader'
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '@/styles/breakpoints' as *;

.main-container {
  max-width: map.get($breakpoints, 'xxl');
  margin: 40px auto;
  @include respond-below(xxl) {
    max-width: 100%;
    padding: 0 24px;
  }
  @include respond-below(sm) {
    padding: 0 8px;
  }
}
</style>
