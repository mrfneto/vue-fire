<script setup>
import { onMounted, ref } from 'vue'
const model = defineModel()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  error: String,
  label: String
})

const input = ref(null)

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value.focus() })
</script>
<template>
  <div :class="$attrs.class">
    <label v-if="label" class="form-label" :for="id">{{ label }}:</label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      ref="input"
      v-bind="{ ...$attrs, class: null }"
      class="form-textarea"
      :type="type"
      v-model="model"
    />

    <select
      v-else-if="type === 'select'"
      :id="id"
      ref="input"
      v-bind="{ ...$attrs, class: null }"
      class="form-select"
      v-model="model"
    >
      <slot />
    </select>

    <input
      v-else
      :id="id"
      ref="input"
      v-bind="{ ...$attrs, class: null }"
      class="form-input"
      :class="{ error: error }"
      :type="type"
      v-model="model"
    />

    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>
