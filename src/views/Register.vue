<script setup>
import Inputs from '../components/Inputs.vue'
import Submit from '../components/Submit.vue'

import { useFirebase } from '../services/auth.services'

import { ref } from 'vue'

const { error, loading, register } = useFirebase()

const name = ref('')
const email = ref('')
const password = ref('')

const onSubmit = async () => {
  if (!name.value) {
    error.value.name = 'Informe o nome do usuário'
    return
  }

  await register(name.value, email.value, password.value)
}
</script>
<template>
  <div>
    <h1>Crie sua conta</h1>
    <form @submit.prevent="onSubmit" class="py-4 space-y-4">
      <Inputs
        label="Nome"
        id="name"
        v-model="name"
        :error="error?.name"
        required
      />
      <Inputs
        label="E-mail"
        id="email"
        type="email"
        v-model="email"
        :error="error?.email"
        required
      />
      <Inputs
        label="Senha"
        id="password"
        type="password"
        v-model="password"
        :error="error?.password"
        required
      />
      <Submit :loading="loading" class="btn-primary w-full">Cadastrar</Submit>
    </form>
    <p class="muted">
      Já tem uma conta?
      <RouterLink :to="{ name: 'login' }" class="btn btn-link">
        Acessar
      </RouterLink>
    </p>
  </div>
</template>
