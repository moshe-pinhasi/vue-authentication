<template>
  <div class="header">
    <div v-if="isAuthenticated && user">
      <span>Hello {{ user.name }}</span>
      <button @click="logout">logout</button>
    </div>
    <button v-else @click="login">login</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    user() {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    login() {
      this.$router.push('/login');
    },
    async logout() {
      await this.$store.dispatch('auth/doLogout');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped></style>
