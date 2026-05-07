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
.main-container {
  max-width: 1800px;
  margin: 40px auto;
}

@media (max-width: 1800px) {
  .main-container {
    max-width: 100%;
    padding: 0 24px;
  }
}
</style>
