<template>
    <div class="login">
        <b-container align-h="center" class="form">
            <b-col>
                <b-row no-gutters align-h="center">
                    <h1>SignUp</h1>
                </b-row>
                <br>
                <b-row no-gutters>
                    <b-form-input required type="text" v-model="username" placeholder="Username"></b-form-input>
                </b-row>
                <br>
                <b-row no-gutters>
                    <b-form-input required type="text" v-model="firstName" placeholder="First name"></b-form-input>
                </b-row>
                <br>
                <b-row no-gutters>
                    <b-form-input required type="text" v-model="lastName" placeholder="Last name"></b-form-input>
                </b-row>
                <br>
                <b-row no-gutters>
                    <b-form-input required type="password" v-model="password" placeholder="Password"></b-form-input>
                </b-row>
                <b-row  no-gutters align-h="center">
                    <b-button type="button" class="btn loginBtn" @click="signUp">Signup</b-button>
                </b-row>
                <b-row  no-gutters>
                    <p>Or if you have account go to <router-link to="/">Login</router-link> page.</p>
                </b-row>
                <b-row no-gutters v-if="this.warring" class="error">            
                    All fields are required
                </b-row>
            </b-col>
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            warring: false
        }
    },
    methods: {
        signUp: function() {
            if(this.username != '' && this.firstName != '' && this.lastName != '' && this.password != '') {
                axios.post('http://localhost:9000/register', {
                    username: this.username,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    password: this.password,
                    image: ''
                }).then(() => { 
                    alert('Succesfull registration, you can now login'); 
                    this.$router.push("login")
                })
            } else {
                this.warring = true;
            }
        }
    }
}
</script>

<style>

</style>