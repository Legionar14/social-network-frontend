<template>
    <div class="login">
        <b-container align-h="center" class="form">
            <b-col>
                <b-row no-gutters align-h="center">
                    <h1>Login</h1>
                </b-row>
                <br>
                <b-row no-gutters>
                    <b-form-input required type="text" v-model="username" placeholder="Username"></b-form-input>
                </b-row>
                <br>
                <b-row no-gutters>
                    <b-form-input required type="password" v-model="password" placeholder="Password"></b-form-input>
                </b-row>
                <b-row  no-gutters align-h="center">
                    <b-button type="button" class="btn loginBtn" @click="login">Login</b-button>
                </b-row>
                <b-row  no-gutters>
                    <p>Or if you don't have account go to <router-link to="/signup">Sign Up</router-link> page.</p>
                </b-row>
                <b-row  no-gutters v-if="this.err" class="error">
                    Username or password incorrect
                </b-row>
                <b-row no-gutters v-if="this.warring" class="error">            
                    Username and password are mandatory
                </b-row>
            </b-col>
        </b-container>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            err: false,
            warring: false,
        }
    },
    methods: {
        login: function() {
            this.loading = true;
            if(this.username != '' && this.password != ''){
                axios
                .get(`http://localhost:9000/login/${this.username}/${this.password}`)
                .then((response) => {
                    this.user = response.data,
                    this.$router.push("main"),
                    localStorage.setItem('user', JSON.stringify(this.user))
                    let token = JSON.stringify(response.headers['jw_token'])
                    sessionStorage.setItem('token', token)
                },
                () => {
                    this.err = true;
                    this.username = '';
                    this.password = '';
                    setTimeout(() => {
                        this.err = false;
                    }, 2000);
                })
            } else {
                this.warring = true
                setTimeout(() => {
                    this.warring = false;
                }, 2000);
            }
        }
    }
}
</script>

<style>
.login {
    display: grid;
    grid-template-columns: 40% 60%;
}
.form {
    margin-top: 10%;
    grid-column-start: 2;
}
.loginBtn {
    margin: 20px 0;
}
.error {
    color: rgb(207, 17, 17);
    text-align: center;
}
</style>