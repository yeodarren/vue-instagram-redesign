<template>
  <div>
    <h1 class="title">Featured Stories</h1>
    <div class="container">
      <div
        v-for="(image, index) of storyImages"
        :key="index"
        class="card"
      >
        <img :src="image" class="image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storyImages: [
        "https://images.unsplash.com/photo-1525138079-9424be9df411?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80",
        "https://images.unsplash.com/photo-1584701782235-beff0661e16a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
        "https://images.unsplash.com/photo-1492056128351-09fb7a99969e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=562&q=80",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.title{
    margin: 10px 20px;
}
.container{
  margin: 10px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .card {
    height: 230px;
    width: 170px;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
  }
  .image {
    height: 230px;
    width: 100%;
  }
}


</style>
