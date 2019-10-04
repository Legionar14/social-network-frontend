<template>
  <div>
    <b-modal id="postDeleted">You deleted post</b-modal>
    <b-form-select v-if="from === 'main' && loading == false" class="noPosts w-75" name="Posts filter" v-model="selected" :options="options" @change="filter()"></b-form-select>
    <b-spinner v-if="this.loading" type="grow" class="mt-5" label="Spinning"></b-spinner>
    <h5 class="noPosts" v-if="posts.length == 0 && from === ''">Ooops no posts you need to find some friends! :(</h5>
    <h5 class="noPosts" v-if="posts.length == 0 && from === 'profile'">
      You don't have any posts. But you can <a class="link" href="/create">create some</a>
    </h5>
    <div v-for="post of posts" v-bind:key="post.id" class="post">
      <div class="flex">
        <p class="title">{{post.title}}</p>
        <p>
          <a v-if="editable" class="link" :href="route + post.id">Edit</a>
          <a v-if="editable" class="ml-3 red link" href="#" @click="deletePost(post.id)">Delete</a>
        </p>
        
      </div>
      <hr>
        <p class="body">{{post.body}}</p>
        <div class="flex">
            <p>Author: <a :href="routeUser + getUserForPost(post.author)">{{getUserForPost(post.author)}}</a></p>
            <b-row>
              <unicon name="thumbs-up" class="thumbsUp" fill="#343a40" @click="like(post.id)"/>
              <Likes v-if="render" class="ml-2" :postId="post.id"/>
            </b-row>
        </div>
        <Comments :key="post.id" :postId="post.id" :users="users" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Likes from './Likes.vue'
import Comments from "./Comments.vue"

export default {
  name: 'Posts',
  components: {
    Likes,
    Comments
  },
  props: {
    userId: Number,
    userIdProfile: Number,
    from: String
  },
  data () {
    return {
      posts: [],
      users: [],
      route: '/edit/',
      routeUser: '/users/',
      editable: false,
      liked: false,
      user: JSON.parse(localStorage.getItem('user')),
      token: JSON.parse(sessionStorage.getItem('token')),
      loading: false,
      render: true,
      selected: null,
      options: [
        {value: null, text: 'Posts filter'},
        {value: 'all', text: 'Get all posts'},
        {value: 'friends', text: 'Get posts by friends'},
        {value: 'my', text: 'Get all your posts'},
      ]
    }
  },
  mounted() {
    this.loading = true;
  },
  created() {

    axios.defaults.headers['jw_token'] = this.token;

    if(this.userIdProfile != undefined ){
      this.editable = true;
      axios
      .get(`http://localhost:9000/posts/user/${this.userIdProfile}`)
      .then((response) => {
        this.posts = response.data
      }).then(() => { this.forceRender() })
    } else if(this.userId != undefined) {
      this.editable = false;
      axios
      .get(`http://localhost:9000/posts/user/${this.userId}`)
      .then((response) => {
        this.posts = response.data
      }).then(() => { this.forceRender() })
    } else {
      this.editable = false;
      axios
      .get(`http://localhost:9000/posts/friends/${this.user.id}`)
      .then((response) => {
        this.posts = response.data
      }).then(() => { this.forceRender() })
    }
    axios
      .get('http://localhost:9000/users')
      .then((response) => {
      this.users = response.data
    }).then(() => { this.loading = false })
  },
  methods: {
    like: function(id) {
      axios.get(`http://localhost:9000/liked/${id}/${this.user.id}`)
      .then((response) => this.liked = response.data.liked).then(() => {
        if(this.liked) {
          axios.delete(`http://localhost:9000/dislike/${id}/${this.user.id}`)
          .then(() => { this.forceRender(); })
        } else {
          axios.post(`http://localhost:9000/like`, {
            userId: this.user.id,
            postId: id
          }).then(() => { this.forceRender();})
        }
      }) 
    },
    getUserForPost(id) {
      return this.users.find(x => x.id == id).username
    },
    deletePost: function(id) {
      axios.delete(`http://localhost:9000/posts/${id}`)
      .then(() => {
        this.$bvModal.show('postDeleted')
        window.location.reload();
      })
    },
    filter() {
      if(this.selected === 'friends' || this.selected == null) {
        this.editable = false;
        axios
        .get(`http://localhost:9000/posts/friends/${this.user.id}`)
        .then((response) => {
          this.posts = response.data
        })
      } else if (this.selected === 'all') {
        this.editable = false;
        axios
        .get(`http://localhost:9000/posts`)
        .then((response) => {
          this.posts = response.data
        })
      } else if (this.selected === 'my') {
        this.editable = false;
        axios
        .get(`http://localhost:9000/posts/user/${this.user.id}`)
        .then((response) => {
          this.posts = response.data
        })
      }
      this.forceRender();
    },
    forceRender() {
      this.render = false;

      this.$nextTick(() => {
          this.render = true;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post {
  padding: 5%;
  margin: 10%;
  border: 1px solid #343a40;
  border-radius: 10px;
}
.title {
  text-align: left;
}
.body {
  height: 150px;
  text-align: center;
}
.flex {
  display: flex;
  justify-content: space-around;
}
.aligne {
  align-content: center;
}
.red {
  color: rgb(230, 0, 0);
}
.link:hover {
  text-decoration: none;
}
.link:visited {
  text-decoration: none;
}
.noPosts {
  margin-top: 10%;
}
.thumbsUp:hover {
  cursor: pointer;
}
</style>
