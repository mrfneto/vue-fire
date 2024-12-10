<script setup>
import Dropdown from '../components/Dropdown.vue'
import Icon from '../components/Icon.vue'
import Logo from '../components/Logo.vue'

import { useFirebase } from '../services/auth.services'
import { useStore } from '../stores'

const store = useStore()

const { logout } = useFirebase()

const links = [{ label: 'Home', to: 'home' }]
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <header class="navbar">
      <nav class="container navbar-nav">
        <div class="navbar-start">
          <Logo />
        </div>
        <div class="navbar-center hidden md:flex">
          <RouterLink
            v-for="(link, index) in links"
            :to="{ name: link.to }"
            class="navbar-link"
          >
            {{ link.label }}
          </RouterLink>
        </div>
        <div class="navbar-end">
          <Dropdown>
            <template #trigger>
              <button class="btn btn-secondary btn-icon">
                <Icon name="Menu" class="size-5" />
              </button>
            </template>
            <template #content>
              <div class="px-4">
                <p class="mb-1 font-medium">
                  {{ store.user?.displayName }}
                </p>
                <p class="muted mb-2 -mt-2">{{ store.user?.email }}</p>
              </div>
              <div class="md:hidden">
                <hr />
                <RouterLink
                  v-for="(link, index) in links"
                  :to="{ name: link.to }"
                  class="btn btn-menu"
                >
                  {{ link.label }}
                </RouterLink>
              </div>
              <hr />
              <button class="btn btn-menu" @click="logout">
                <Icon name="LogOut" class="size-5 mr-2" />
                <span>Sair</span>
              </button>
            </template>
          </Dropdown>
        </div>
      </nav>
    </header>
    <main class="container pt-24 pb-8">
      <RouterView />
    </main>
  </div>
</template>
