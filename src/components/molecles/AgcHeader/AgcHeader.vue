<template>
  <h1
    class="agc-header"
    @click="goToHome"
  >
    AGCapital-Challenge
  </h1>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ProjectStatuses } from '@/stores/projectsStore'

const router = useRouter()

function goToHome() {
  router.push({
    name: 'projects',
    params: {
      tab: ProjectStatuses.OPEN
    }
  })
}
</script>

<style lang="scss" scoped>
.agc-header {
  font-size: 40px;
  text-align: center;
  padding: 24px 0;
  margin-bottom: 24px;
  cursor: default;
}

@media (max-width: 480px) {
  .agc-header {
    font-size: 32px;
    margin-bottom: 8px;
    padding: 8px 0;
  }
}
</style>
