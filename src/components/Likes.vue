<template>
  <p>{{likes}}</p>
</template>

<script>
import axios from "axios"

export default {
    name: 'Likes',
    props: {
        postId: Number
    },
    data() {
        return {
            likes: null
        }
    },
    created() {
        axios
        .get(`http://localhost:9000/likes/${this.postId}`)
        .then((response) => {
          this.likes = response.data.likes
        })
    },
}
</script>

<style>

</style>