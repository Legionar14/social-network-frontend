<template>
<div>
    <Navbar />
    <div class="grid container">
        <div class="input">
        <h1>Search</h1>
        <b-col>
            <b-form-input type="text" id="text" v-model="searchItem" placeholder="Please enter search term" required></b-form-input>
            <b-button type="submit" @click="getUsers()">Search</b-button>
        </b-col>
        </div>
        <div class="usersList">
            <p v-if="empty">No users with that credentials</p>
            <div class="userData" v-for="user of users" :key="user.id">
                <p><b>Username: </b><a :href="route + user.username">{{user.username}}</a></p>
                <p><b>First name:</b> {{user.firstName}}</p>
                <p><b>Last name:</b> {{user.lastName}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from './Navbar.vue'
import axios from 'axios'

export default {
    name: 'Search',
    components: {
        Navbar
    },
    data() {
        return {
            users: [],
            searchItem: '',
            route: '/users/',
            empty: false,
            token: JSON.parse(sessionStorage.getItem('token'))
        }
    },
    methods: {
        getUsers() {
            axios.defaults.headers['jw_token'] = this.token;

            this.empty = false;

            if(this.searchItem === '') {
                this.empty = true;
                return;
            }

            axios.get(`http://localhost:9000/users/${this.searchItem}`)
            .then((response) => { this.users = response.data })
            .then(() => {
                if(this.users.length == 0) {
                    axios.get(`http://localhost:9000/users/f/${this.searchItem}`)
                    .then((response) => { this.users = response.data })
                    .then(() => {
                        if(this.users.length == 0) {
                            this.getByLastName();
                        }
                    })
                }
            })
            
        },
        getByLastName() {
            axios.get(`http://localhost:9000/users/l/${this.searchItem}`)
            .then((response) => {
                this.users = response.data
            }).then(() => {
                if(this.users.length == 0) {
                    this.empty = true;
                }
            })
        }
    }
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
.input {
    margin-top: 10%;
    grid-column-start: 2;
}
#text {
    margin: 20px 0;
}
.userData {
    border: 1px solid #343a40;
    border-radius: 10px;
    padding: 15px;
}
.usersList {
    margin-top: 10%;
    grid-column-start: 2;
}
</style>