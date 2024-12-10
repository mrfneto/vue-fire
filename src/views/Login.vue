<script setup>
import Inputs from '../components/Inputs.vue'
import Submit from '../components/Submit.vue'

import { ref } from 'vue'
import { useFirebase } from '../services/auth.services'

const { error, loading, login } = useFirebase()

const email = ref('')
const password = ref('')

const onSubmit = async () => {
  await login(email.value, password.value)
}
</script>
<template>
  <div>
    <h1>Acesse sua conta</h1>
    <form @submit.prevent="onSubmit" class="py-4 space-y-4">
      <Inputs
        label="E-mail"
        id="email"
        type="email"
        v-model="email"
        :error="error?.email"
        required
      />
      <div>
        <Inputs
          label="Senha"
          id="password"
          type="password"
          v-model="password"
          :error="error?.password"
          required
        />
        <RouterLink
          :to="{ name: 'recovery' }"
          class="btn btn-link float-end mt-2"
        >
          Esqueceu a senha?
        </RouterLink>
      </div>
      <Submit :loading="loading" class="btn-primary w-full">Acessar</Submit>
    </form>
    <p class="muted">
      Já tem uma conta?
      <RouterLink :to="{ name: 'register' }" class="btn btn-link">
        Cadastrer
      </RouterLink>
    </p>
  </div>
</template>
