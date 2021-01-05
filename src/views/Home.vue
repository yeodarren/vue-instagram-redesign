<template>
  <div class="home">
    <Navigation />
    <ProfilePage />
    <PostModal />
  </div>
</template>

<script>
import ProfilePage from '../components/ProfilePage.vue'
import PostModal from '../components/PostModal.vue'
import Navigation from '../components/Navigation.vue'
export default {
  components: {
    Navigation,
    ProfilePage,
    PostModal
  }
};
</script>

<style lang="scss" scoped>

</style>
