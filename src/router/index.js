import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import CreatePost from '../components/CreatePost.vue'
import MainPage from '../components/MainPage.vue'
import Search from '../components/Search.vue'
import Profile from '../components/Profile.vue'
import Edit from '../components/Edit.vue'
import SignUp from '../components/SignUp'
import Users from '../components/Users.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/create',
            name: 'Create',
            component: CreatePost,
        },
        {
            path: '/main',
            name: 'Main',
            component: MainPage,
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/edit/:id',
            name: 'Edit',
            props: true,
            component: Edit
        },
        {
            path: '/users/:username',
            name: 'Users',
            props: true,
            component: Users
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    if(to.fullPath === '/main' || to.fullPath === '/create' || to.fullPath === '/search' || 
    to.fullPath === '/profile' || to.fullPath === '/edit' || to.fullPath === '/users') {
        if(!token) {
            next('/')
        }
    }
    if(to.fullPath === '/' || to.fullPath === '/signup') {
        if(token) {
            next('/main')
        }
    }
    next();
});

export default router;