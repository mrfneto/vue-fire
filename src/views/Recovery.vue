<script setup>
import Inputs from '../components/Inputs.vue'
import Submit from '../components/Submit.vue'

import { ref } from 'vue'
import { useFirebase } from '../firebase/fbServices'

const { error, loading, message, recovery } = useFirebase()

const email = ref('')

const onSubmit = async () => {
  await recovery(email.value)
  email.value = ''
}
</script>
<template>
  <div>
    <h1>Esqueceu a senha?</h1>
    <div
      v-if="message"
      class="mt-4 p-2 text-sm text-success-700 bg-success-100 border border-success-200 rounded"
    >
      {{ message }}
    </div>
    <form @submit.prevent="onSubmit" class="py-4 space-y-4">
      <Inputs
        label="E-mail"
        id="email"
        type="email"
        v-model="email"
        :error="error?.email"
        required
      />
      <Submit :loading="loading" class="btn-primary w-full"
        >Enviar Email de Redefinição</Submit
      >
    </form>
    <p class="muted">
      <RouterLink :to="{ name: 'login' }" class="btn btn-link">
        Voltar
      </RouterLink>
    </p>
  </div>
</template>
