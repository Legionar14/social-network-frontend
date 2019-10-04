<template>
  <div class="border">
    <b-button @click="toggle()" variant="dark">Show comments</b-button>

    <b-collapse :id="postId" class="mt-2">

        <div class="m-3">
            <b-form-input class="mb-2" v-model="commentTitle" placeholder="Comment title"></b-form-input>
            <b-form-textarea v-model="commentBody"  placeholder="Comment text..."></b-form-textarea>
            <p v-if="empty" class="m-3">To comment you need to enter title and text first. </p>
            <b-button class="m-3" @click="comment()" variant="dark">Comment</b-button>
        </div>
        <div v-for="comment of comments" :key="comment.id">
            <b-card :header="comment.commentTitle" class="mb-3">
                <p>{{comment.commentBody}}</p>
                <div class="mt-5">
                    <p class="float-left">
                        <b>Author:</b><a class="ml-2" @click.middle="toggle()" :href="route + findAuthor(comment.author)">{{findAuthor(comment.author)}}</a>
                    </p>
                    <unicon v-if="user.username === findAuthor(comment.author)" 
                        class="float-right trash" name="trash-alt" fill="red" @click="deleteComment(comment.id)" />
                </div>
            </b-card>
        </div>
    </b-collapse>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Comments',
    props: {
        postId: Number,
        users: Array,
    },
    data() {
        return {
            comments: [],
            commentBody: '',
            commentTitle: '',
            route: '/users/',
            user: JSON.parse(localStorage.getItem('user')),
            empty: false
        }
    },
    created() {
        axios.get(`http://localhost:9000/comments/${this.postId}`)
        .then((response) => {
            this.comments = response.data;
            this.comments.reverse()
        })
    },
    methods: {
        toggle() {
            this.$root.$emit('bv::toggle::collapse', this.postId)
        },
        findAuthor(id) {
            return this.users.find(x => x.id == id).username;
        },
        comment() {
            if(this.commentBody != '' && this.commentTitle != ''){
                axios.post('http://localhost:9000/comment', {
                postId: this.postId,
                author: this.user.id,
                commentTitle: this.commentTitle,
                commentBody: this.commentBody
                }).then(() => {
                    axios.get(`http://localhost:9000/comments/${this.postId}`)
                    .then((response) => {
                        this.comments = response.data;
                        this.comments.reverse()
                    }).then(() => {
                        this.commentTitle = '';
                        this.commentBody = '';
                    })
                })
            } else {
                this.empty = true;
                setTimeout(() => {
                    this.empty = false;
                }, 2000)
            }
        },
        deleteComment(id) {
            axios.delete(`http://localhost:9000/comment/${id}`)
            .then(() => {
                axios.get(`http://localhost:9000/comments/${this.postId}`)
                .then((response) => {
                    this.comments = response.data;
                    this.comments.reverse()
                })
            })
        }
    }
}
</script>

<style scoped>
    .border {
        border: 1px solid grey;
        padding: 20px;
        border-radius: 10px;
    }
    .trash:hover {
        cursor: pointer;
    }
</style>