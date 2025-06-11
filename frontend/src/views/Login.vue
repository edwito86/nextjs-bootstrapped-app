<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="workerKey"
                label="Worker Key"
                required
              ></v-text-field>
              <v-text-field
                v-model="fingerprintData"
                label="Fingerprint Data (optional)"
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="primary" block>Login</v-btn>
            </v-form>
          </v-card-text>
          <v-alert v-if="error" type="error" dense>{{ error }}</v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      workerKey: '',
      fingerprintData: '',
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          workerKey: this.workerKey,
          fingerprintData: this.fingerprintData,
        });
        // Save token and user info (this example uses localStorage)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.$router.push('/inventory');
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
      }
    },
  },
};
</script>
