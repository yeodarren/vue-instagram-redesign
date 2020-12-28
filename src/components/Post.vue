<template>
  <img @click="viewPost" class="image" :src="post.imageURL" v-test="{id: 'image'}" data-cy="post" id="post"/>
</template>

<script>
import { mapActions } from "vuex";
import Test from "../directives/test";
export default {
  directives: { Test },
  props: ["post"],
  methods: {
    ...mapActions({
      setSelectedPost: "posts/setSelectedPost",
      showPost: "posts/viewPost",
    }),
    viewPost() {
      this.setSelectedPost(this.post);
      this.showPost(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
    height: 230px;
    min-width: 200px;
}
</style>
