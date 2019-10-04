<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-container>
      <b-navbar-brand href="/main">{{this.user.username}}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/search">Search</b-nav-item>
          <b-nav-item href="/create">Create post</b-nav-item>
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/" @click="logOut">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-collapse>
    </b-container>
    </b-navbar>
</template>

<script>
export default {
    data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
    }
  }
}
</script>

<style>

</style>