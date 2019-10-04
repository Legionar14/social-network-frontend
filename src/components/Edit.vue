<template>
  <div>
    <Navbar />
    <div class="divForm container">
        <b-col class="col">
        <h1 class="element title">Edit post</h1>
        <b-form-input class="element" type="text" v-model="post.title"></b-form-input>
        <b-form-input class="element" type="text" v-model="post.body"></b-form-input>
        <b-button @click="save" class="element" variant="dark">Save</b-button>
        </b-col>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'

export default {
    name: 'Edit',
    props: ['id'],
    components: {
        Navbar
    },
    data() {
        return {
            post: {},
            token: JSON.parse(sessionStorage.getItem('token'))
        }
    },
    created() {
        axios.defaults.headers['jw_token'] = this.token;

        axios
        .get(`http://localhost:9000/posts/${this.id}`)
        .then((response) => {
            this.post = response.data
        })
    },
    methods: { 
        save: function() {
            if(this.post.title != '' && this.post.body != '') {
                axios
                .put('http://localhost:9000/posts/update', {
                    id: this.post.id,
                    author: this.post.author,
                    title: this.post.title,
                    body: this.post.body,
                    likes: this.post.likes
                })
                .then(() => {
                    window.location.href = "http://localhost:8080/profile"
                })
            }
        }
    }
}
</script>

<style scoped>
.divForm {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr
}
.col {
    grid-column-start: 2
}
.element {
    width: 100%;
    margin-left: 10%;
    margin-top: 5px;
}
.title {
    margin-top: 20%;
}
</style>