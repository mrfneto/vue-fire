<script setup>
import Icon from './Icon.vue'

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <button class="btn" type="submit" :disabled="loading">
    <Icon v-if="loading" name="LoaderCircle" class="w-6 animate-spin" />
    <slot v-else />
  </button>
</template>
