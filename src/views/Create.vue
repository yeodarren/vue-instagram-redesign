<template>
  <div class="container">
    <h1 class="title">Create New Post</h1>
    <form @submit.prevent="submit" v-test="{ id: 'form' }" data-cy="create-form">
      <label>Caption</label>
      <input type="text" v-model="caption" placeholder="Enter caption" v-test="{ id: 'caption' }" data-cy="caption" />
      <input class="file" type="file" @change="change" data-cy="file"/>
      <div class="actions">
        <button class="return" @click="goBack" v-test="{ id: 'returnButton' }">
          Go Back
        </button>
        <button type="submit" class="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Test from "../directives/test";
export default {
  directives: { Test },
  data: () => ({
    caption: "",
    image: null,
  }),
  computed: {
    ...mapGetters({
      user: "auth/getUser",
    }),
  },
  methods: {
    ...mapActions({
      upload: "posts/createPost",
    }),
    goBack() {
      this.$router.push("/");
    },
    change(event) {
      if (event) {
        this.image = event.target.files[0];
      }
    },
    submit() {
      this.upload({
        image: this.image,
        caption: this.caption,
        username: this.user.name,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-self: center;

    label {
      text-align: initial;
      padding: 10px 0;
    }

    input {
      padding: 5px;
      font-size: 1rem;
    }

    .file {
      padding-top: 10px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;

      button {
        margin-top: 10px;
        margin-left: 10px;
        width: 120px;
        height: 35px;
        color: white;
        background-color: #e7596f;
        border-radius: 5px;
        border: none;
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 728px) {
  .container {
    form {
      .actions {
        display: flex;
        flex-direction: column;

        button {
          width: 100%;
          margin-left: 0;
        }
      }
    }
  }
}
</style>
