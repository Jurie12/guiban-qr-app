<template>
  <v-container class="d-flex justify-center align-center" style="height: 50vh;">
    <v-card class="pa-9" max-width="500" elevation="10" rounded="lg">
      <v-card-title class="text-h4 font-weight-bold text-center">Login Page</v-card-title>
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          clearable
          class="mb-4"
          persistent-hint
          hide-details="auto"
          density="comfortable"
        />

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock-outline"
          clearable
          class="mb-6"
          persistent-hint
          hide-details="auto"
          density="comfortable"
        />

        <v-btn
          :disabled="!form"
          :loading="loading"
          color="primary"
          size="large"
          type="submit"
          block
        >
          Login
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(false)
const email = ref('')
const password = ref('')
const loading = ref(false)

function onSubmit () {
  if (!form.value) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

function required (v) {
  return !!v || 'This field is required'
}
</script>
