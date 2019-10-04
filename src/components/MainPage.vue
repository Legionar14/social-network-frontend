<template>
<div>
  <Navbar />
  <div class="container">
    <div class="userCard">
      <img v-if="user.image" :src="user.image" class="profilePicture">
      <img v-if="user.image == ''" src="../assets/def.jpg" alt="Profile picture" class="profilePicture">
      <p><b>First Name:</b> {{user.firstName}}</p>
      <p><b>Last Name:</b> {{user.lastName}}</p>
    </div>
    <Posts class="posts" from="main"/>
  </div>
</div>
</template>

<script>
import Posts from './Posts.vue'
import Navbar from './Navbar.vue'

export default {
  name: 'Main',
  components: {
    Posts,
    Navbar
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  }
}
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1fr 2fr
}
.posts {
  grid-column-start: 2
}
.userCard {
  padding: 15%;
  margin-top: 20%;
  margin-right: 5%;
  background: #343a40;
  height: 547px;
  color: #fff;
  border-radius: 10px;
}
.profilePicture {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  border-radius: 50%;
}
</style>