<template>
    <div class="profile-page">
        <Stories />
        <Feed />
    </div>
</template>

<script>
import Stories from './Stories.vue'
import Feed from './Feed.vue'
export default {
    components: {
        Stories,
        Feed
    }
}
</script>

<style lang="scss" scoped>
.profile-page{
    position: relative;
}
</style>