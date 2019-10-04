<template>
    <div>
        <Navbar />
        <div class="profile container">
            <b-modal id="unauthorized" hide-footer  title="Unauthorized" hide-header-close>
                <p>You need to be loged in to see this page.</p>
                <b-button class="m-2" href="/">Log in</b-button>
                <b-button class="m-2" href="/signup">Sign up</b-button>
            </b-modal>
            <b-form class="formProfile">
                <b-col>
                    <b-row class="flex" no-gutters>
                        <h5>Profile info</h5>
                        <a href="#" @click="editFun">Edit</a>
                    </b-row>
                    <img v-if="user.image" :src="user.image" class="profilePicture">
                    <img v-if="user.image == ''" src="../assets/def.jpg" alt="Profile picture" class="profilePicture">
                    <b-row>
                        <b-form-input type="text" class="text" :disabled="!edit" v-model="user.firstName"></b-form-input>
                    </b-row>
                    <b-row>
                        <b-form-input type="text" class="text" :disabled="!edit" v-model="user.lastName"></b-form-input>
                    </b-row>
                    <b-row>
                        <b-form-file class="text" id="fileInput" :disabled="!edit" placeholder="" accept="image/*">Change photo</b-form-file>
                    </b-row>
                    <b-row class="flex">
                        <b-button v-if="edit" @click="updateUser">Save</b-button>
                        <a href="#" v-if="edit" class="mt-2" @click="cancelEdit()">Cancel edit</a>
                    </b-row>
                </b-col>
            </b-form>
            <Posts :userIdProfile="user.id" from="profile" class="posts" />
            <FriendsList class="list" :userId="user.id" from="profile"/>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue'
import FriendsList from './FriendsList.vue'
import Posts from './Posts.vue'
import axios from 'axios'

export default {
    name: 'Profile',
    components: {
        Navbar,
        Posts,
        FriendsList
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            edit: false,
            token: JSON.parse(sessionStorage.getItem('token')),
            imgPrefix: 'data:image/jpeg;base64, ',
            img: ''
        }
    },
    methods: {
        editFun: function() {
            if(this.edit) {
                this.edit = false;
            } else {
                this.edit = true;
            }
        },
        cancelEdit() {
            this.edit = false;
        },
        updateUser: function() {
            axios.defaults.headers['jw_token'] = this.token;

            let file = document.querySelector('#fileInput').files[0];
            let reader = new FileReader();

            if(file) {
                reader.onload = () => {
                    this.img = reader.result;
                    
                    axios
                    .put('http://localhost:9000/users/update', {
                        id: this.user.id,
                        username: this.user.username,
                        firstName: this.user.firstName,
                        lastName: this.user.lastName,
                        password: this.user.password,
                        image: this.img
                    })
                    .then(() => {
                        localStorage.removeItem('user');
                        this.user.image = this.img;
                        localStorage.setItem('user', JSON.stringify(this.user));
                        this.edit = false;
                    })
                }

                reader.readAsDataURL(file)
            }
        }
    }
}
</script>

<style>
.profile {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
}
.posts {
    grid-column-start: 2
}
.list {
    grid-column-start: 3
}
.formProfile {
    margin-top: 20%;
    grid-column-start: 1;
    border: 1px solid #343a40;
    height: 420px;
    margin-left: 5%;
    border-radius: 10px;
    padding: 5%; 
}
.text {
    text-align: center;
    margin-bottom: 10px;
}
.profilePicture {
    margin-top: 20px;
}
.flex {
    margin-top: 10px;
    display: flex;
    justify-content: space-between
}
</style>