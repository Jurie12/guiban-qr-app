<template>
  <v-container class="d-flex justify-center align-center" style="height: 50vh">
    <v-card class="pa-9" max-width="500" elevation="10" rounded="lg">
      <div class="d-flex align-center my-4">
        <v-divider class="flex-grow-1" />
        <div class="mx-4">Login Page</div>
        <v-divider class="flex-grow-1" />
      </div>

      <v-form v-model="form">
        <v-text-field
          v-model="username"
          :readonly="loading"
          :rules="[required]"
          label="Username"
          type="text"
          prepend-inner-icon="mdi-account-multiple"
          clearable
          class="mb-4 steady-input"
          hide-details="true"
          density="comfortable"
          rounded
          outlined
        />

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock-outline"
          clearable
          class="mb-6 steady-input"
          hide-details="true"
          density="comfortable"
          rounded
          outlined
        />

        <v-btn
          :loading="loading"
          class="rounded-btn primary-btn"
          size="large"
          type="button"
          block
        >
          Login
        </v-btn>

        <div class="d-flex align-center my-4">
          <v-divider class="flex-grow-1" />
          <div class="mx-4">or</div>
          <v-divider class="flex-grow-1" />
        </div>

                <v-btn 
                  color="red"
                  dark
                  rounded
                  @click="signInWithGoogle()"
                >
                  <v-icon left>"mdi mdi-google"</v-icon>
                  Sign in with Google
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.rounded-btn {
  border-radius: 30px;
  font-weight: bold;
  text-transform: none;
}

.primary-btn {
  background-color: #1976d2 !important;
  color: white;
}

.google-btn {
  background-color: #db4437 !important;
  color: white;
  border: none;
  text-transform: none;
  font-weight: 500;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.google-btn:hover {
  background-color: #c33d2e !important;
}

.steady-input {
  min-height: 56px;
}
</style>
<script>
export default {
 layout: "auth",
 middleware: "guest",
 methods:{
  signInWithGoogle() {
    this.$auth.loginWith('google')
  }
 }
}

</script>