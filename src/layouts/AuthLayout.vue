<script setup>
import { RouterView } from 'vue-router'
import Logo from '../components/Logo.vue'
</script>
<template>
  <div class="min-h-screen flex justify-center">
    <div class="w-full max-w-md p-6 mt-16">
      <header class="flex justify-center">
        <Logo />
      </header>
      <main class="mt-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
