<script setup>
import Icon from './Icon.vue'

const title = import.meta.env.VITE_APP_TITLE || 'Vue App'
</script>
<template>
  <RouterLink to="/" class="flex items-center">
    <Icon name="Code" class="size-8" />
    <h3 class="mb-0 ml-2 hidden md:block">
      {{ title }}
    </h3>
  </RouterLink>
</template>
