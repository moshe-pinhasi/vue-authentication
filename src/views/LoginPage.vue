<template>
  <div class="login-page">
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Snoopy" />
      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <button class="btn-submit" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'moshe',
      password: '12345'
    };
  },
  methods: {
    async login() {
      const { username, password } = this;
      await this.$store.dispatch('auth/doLogin', { username, password });
      this.$router.push('/user');
    }
  }
};
</script>

<style scoped>
label,
.btn-submit {
  margin: 0 3px;
}
</style>
