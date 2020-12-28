<template>
  <div>
    <div v-if="viewPost" @click="close" class="backdrop" v-test="{id: 'backdrop'}"></div>
    <transition name="dialog">
      <dialog open v-if="viewPost" v-test="{id: 'postModal'}" data-cy="post-modal">
        <div class="card">
          <img class="image" :src="selectedPost.imageURL" />
          <div class="info">
            <div class="close" @click="close" v-test="{id: 'closeButton'}">
              <icon name="times" />
            </div>

            <h4>
              @{{ selectedPost.username }}
              <span>{{ selectedPost.caption }}</span>
            </h4>
            <h5
              class="comments"
              v-for="(comment, index) of comments"
              :key="index"
              data-cy="comments"
            >
              @{{ comment.username }} <span>{{ comment.text }}</span>
            </h5>
            <form @submit.prevent="addComment" v-test="{id: 'commentForm'}" data-cy="comment-form">
              <input
                type="text"
                v-model="comment"
                placeholder="Add a comment..."
                v-test="{id: 'comment'}"
                data-cy="comment"
              />
              <button type="submit" class="submit">
                <strong>Submit</strong>
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/times";
import Test from "../directives/test";
export default {
  components: {
    Icon,
  },
  directives: { Test },
  data: () => ({
    comment: "",
  }),
  computed: {
    ...mapGetters({
      viewPost: "posts/viewPost",
      selectedPost: "posts/getSelectedPost",
      comments: "posts/getComments",
      user: "auth/getUser",
    }),
  },
  methods: {
    ...mapActions({
      closePost: "posts/viewPost",
      setComment: "posts/addComment",
      getComments: "posts/getComments",
    }),
    close() {
      this.closePost(false);

      this.comment = "";
    },
    addComment() {
      this.setComment({
        comment: this.comment,
        postId: this.selectedPost.id,
        username: this.user.name,
      });
      this.comment = "";
    },
  },
  watch: {
    selectedPost(current, old) {
      if (current && current !== old) {
        this.getComments({ postId: this.selectedPost.id });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 10%;
  border: none;
  z-index: 100;
  padding: 0;
  //   overflow: scroll;

  .card {
    display: flex;

    // flex-wrap: wrap;

    .image {
      height: 500px;
      object-fit: contain;
    }

    .info {
      padding: 20px;

      .close {
        margin: 5px;
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
      }

      input {
        border: none;
        padding: 5px;
      }

      button {
        border: none;
        background-color: white;
        color: #e7596f;
        cursor: pointer;
      }

      h4 {
        margin: 10px 0;
      }

      .comments {
        margin-left: 10px;
      }
    }
  }
}

h4,
h5 {
  color: navy;
}

span {
  color: black;
}

.dialog-enter-active {
  transition: transform 0.2s ease-out;
}

// .dialog-leave-active {
//     transition: transform 0.2s ease-in;
// }

.dialog-enter,
.dialog-leave-to {
  transform: scale(0.5);
}

.dialog-enter-to,
.dialog-leave {
  transform: scale(1);
}

@media (max-width: 1000px) {
  dialog {
    .card {
      display: block;
      max-width: 400px;

      .image{
        max-width: 400px;
      }

      .info {
        font-size: 1rem;
        overflow: scroll;
        padding: 10px 20px;
        height: 100px;

        .close {
          margin: 0;
        }

        form{
          display: flex;
          justify-content: space-between;
        }
        input{
            width: 100%;
        }
      }
    }
  }
}
</style>
