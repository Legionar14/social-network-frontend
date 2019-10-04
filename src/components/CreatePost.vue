<template>
    <div>
        <Navbar />
        <div class="divForm container">
            <p class="element title">Title:</p>
            <b-input class="element" type="text" v-model="title" required placeholder="Title of post"></b-input>
            <br>
            <p class="element">Post text:</p>
            <b-input class="element body" type="text" v-model="body" required placeholder="Body of post..."></b-input>
            <br>
            <b-button type="button" @click="createPost" class="btn element" variant="dark">Create post</b-button>
            <p v-if="this.input" class="error mt-3">You must enter title and text of post</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import Navbar from './Navbar.vue'
export default {
    name: 'CreatePost',
    components: {
        Navbar
    },
    data() {
        return {
            title: '',
            body: '',
            input: false,
            user: JSON.parse(localStorage.getItem('user')),
            token: JSON.parse(sessionStorage.getItem('token'))
        }
    },
    methods: {
        createPost: function() {
            axios.defaults.headers['jw_token'] = this.token;

            if(this.title != '' && this.body != ''){
                axios
                .post('http://localhost:9000/posts', {
                    author: this.user.id,
                    title: this.title,
                    body: this.body
                })
                .then(() => {
                    this.$router.push("profile")
                })
            } else {
                this.input = true
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
.element {
    width: 100%;
    grid-column-start: 2;
    margin-left: 10%;
    margin-top: 5px;
}
.btn {
    margin-top: 15px;
}
.error {
    color: rgb(207, 17, 17);
}
.title {
    margin-top: 10%;
}
.body {
    height: 200px;
}
</style>