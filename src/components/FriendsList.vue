<template>
  <div class="friends">
      <h6 class="title">Friends list</h6>
      <hr>
      <div v-for="friend of friends" v-bind:key="friend">
          <p class="item">{{users.find(x => x.id == friend.userTwo).username}} 
            <b-badge v-if="friend.status == 'confirmed'" pill variant="dark">{{friend.status}}</b-badge>
            <b-badge v-if="friend.status == 'pending'" pill variant="info">{{friend.status}}</b-badge>
            <a v-if="friend.status == 'pending' && from == 'profile' && 
            sentRequest != user.username" href="#" @click="acceptRequest(friend.userTwo)"> Accept</a>
          </p>
          <hr>
      </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'FriendsList',
    props: {
      userId: Number,
      from: String
    },
    data() {
        return {
          users: [],
          friends: [],
          sentRequest: JSON.parse(localStorage.getItem('sentRequest')),
          userTwo: 0,
          token: JSON.parse(sessionStorage.getItem('token')),
          user: JSON.parse(localStorage.getItem('user')),
          update: 0
        }
    },
    mounted () {
        axios.defaults.headers['jw_token'] = this.token;

        axios
        .get(`http://localhost:9000/friends/${this.userId}`)
        .then((response) => {
          this.friends = response.data; 
        }),
        axios
          .get('http://localhost:9000/users')
          .then((response) => {
          this.users = response.data
        })
  },
  methods: {
    acceptRequest(userOne) {
      axios.post(`http://localhost:9000/acceptRequest/${userOne}/${this.userId}`)
      .then(() => {
          localStorage.removeItem('sentRequest');
          window.location.reload();
        })
    },
  }
}
</script>

<style scoped>
.friends {
  margin-top: 60px;
  border: 1px solid #343a40;
  border-radius: 10px;
  height: 300px;
  overflow: auto;
  margin-right: 5%
}
.title {
  margin-top: 10px;
}
.item {
    margin-top: 15px;
}
</style>