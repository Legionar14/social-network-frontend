<template>
     <div>
        <Navbar />
        <b-modal id="fRequestS" hide-footer title="Friend request">
            <p>You sent friend request to {{user.username}}</p>
        </b-modal>
        <b-modal id="fRequestE" hide-footer title="Friend request">
            <p>You and {{user.username}} are alredy friends</p>
        </b-modal>
        <b-modal id="unauthorized" hide-footer  title="Unauthorized" hide-header-close>
            <p>You need to be loged in to see this page.</p>
            <b-button class="m-2" href="/">Log in</b-button>
            <b-button class="m-2" href="/signup">Sign up</b-button>
        </b-modal>
         <div class="profile container">
             <b-form class="formProfile">
                 <b-col>
                    <b-row class="flex" no-gutters>
                        <h5>Profile info</h5>
                    </b-row>
                    <img v-if="user.image" :src="user.image" class="profilePicture">
                    <img v-if="user.image == ''" src="../assets/def.jpg" alt="Profile picture" class="profilePicture">
                    <b-row>
                        <b-form-input type="text" class="text" disabled v-model="user.username"></b-form-input>
                    </b-row>
                    <b-row>
                        <b-form-input type="text" class="text" disabled v-model="user.firstName"></b-form-input>
                    </b-row>
                    <b-row>
                        <b-form-input type="text" class="text" disabled v-model="user.lastName"></b-form-input>
                    </b-row>
                    <b-row class="flex">
                        <b-button v-if="currentUser.id != user.id" @click="addFriend()">Add friend</b-button>
                    </b-row>
                 </b-col>
             </b-form>
            <Posts v-if="renderComponent" :userId="user.id" class="posts" />
            <FriendsList v-if="renderComponent" class="list" :userId="user.id"/>
         </div>
     </div>
</template>

<script>
import Posts from './Posts.vue'
import Navbar from './Navbar.vue'
import FriendsList from './FriendsList.vue'
import axios from 'axios'

export default {
    name: 'Users',
    props:['username'],
    components: {
        Posts,
        Navbar,
        FriendsList
    },
    data() {
        return {
            user: JSON,
            currentUser: JSON.parse(localStorage.getItem('user')),
            token: JSON.parse(sessionStorage.getItem('token')),
            renderComponent: true
        }
    },
    created() {
        axios.defaults.headers['jw_token'] = this.token;

        axios.get(`http://localhost:9000/users/${this.username}`)
        .then((response) => { this.user = response.data[0] }, error => {
            if(error.response.status === 401) {
                this.$bvModal.show('unauthorized')
            }
        }).then(() => { this.forceRender() })
    },
    methods: {
        addFriend() {
            axios.defaults.headers['jw_token'] = this.token;

            axios.post(`http://localhost:9000/addFriend`, {
                userOne: this.currentUser.id,
                userTwo: this.user.id,
                status: 'pending'
            }).then(() => this.$bvModal.show('fRequestS')).then(() => {
                localStorage.setItem('sentRequest', JSON.stringify(this.currentUser.username));
                this.forceRender();
            }).catch(() => {this.$bvModal.show('fRequestE')})
        },
        forceRender() {
            this.renderComponent = false;

            this.$nextTick(() => {
                this.renderComponent = true;
            })
        }
    }
}
</script>

<style>

</style>