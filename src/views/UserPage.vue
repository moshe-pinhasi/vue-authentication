<template>
  <div class="user-page">
    <h1>Profile</h1>
    <div v-if="user">Hello {{ user.name }}</div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('user/fetchUser');
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    }
  }
};
</script>

<style scoped></style>
