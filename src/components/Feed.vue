<template>
    <div>
        <h1 class="title">Latest Feed</h1>
        <div class="container">
            <div class="card" v-for="post of posts" :key="post.id" data-cy="posts">
                <Post :post="post" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Post from "./Post.vue"
export default {
  components: {
    Post
  },
  computed: {
    ...mapGetters({
      posts: 'posts/getPosts'
    })
    // posts(){
    //   return this.$store.getters["posts/getPosts"]
    // }
  }
};
</script>

<style lang="scss" scoped>
.title{
    margin: 10px 20px;
}

.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  .card {
    height: 230px;
    width: 200px;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
  }
}
</style>