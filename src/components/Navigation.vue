<template>
  <div>
    <nav class="navbar" v-test="{ id: 'navbar' }">
      <div
        class="menu"
        @click="toggleDrawer"
        v-test="{ id: 'menu' }"
        data-cy="menu"
      >
        <icon scale="1.5" name="bars" />
      </div>
      <ul class="nav-links">
        <li class="create">
          <button
            class="create-button"
            @click="routeToCreate"
            v-test="{ id: 'create' }"
            data-cy="create-button"
          >
            <icon scale="1.5" name="plus" />
            <span class="btn-text"><strong>Create</strong></span>
          </button>
        </li>
        <li class="envelope">
          <icon scale="1.5" name="envelope" />
        </li>
        <li class="heart">
          <icon scale="1.5" name="heart" />
        </li>
      </ul>
    </nav>
    <transition name="modal">
      <div
        class="modal"
        @click="toggleDrawer"
        v-if="drawer"
        v-test="{ id: 'close' }"
      ></div>
    </transition>
    <transition name="drawer">
      <div
        class="navigation-drawer"
        v-if="drawer"
        v-test="{ id: 'navigationDrawer' }"
      >
        <div class="close" @click="toggleDrawer" v-test="{ id: 'close' }">
          <icon name="times" />
        </div>
        <img class="logo" src="../assets/instagram_logo.png" alt="logo" />
        <div class="avatar">
          <icon scale="4" name="user-circle" />
        </div>
        <div class="title">
          {{ user.name }}
        </div>
        <div class="info">
          <div class="posts">
            <h1>Posts</h1>
            <p>{{ posts.length }}</p>
          </div>
          <div class="followers">
            <h1>Followers</h1>
            <p>423</p>
          </div>
          <div class="following">
            <h1>Following</h1>
            <p>118</p>
          </div>
        </div>
        <div class="list-item">
          <ul>
            <li>
              <icon scale="1.5" name="home" />
              <span class="list-item-text">Feed</span>
            </li>
            <li>
              <icon scale="1.5" name="compass" />
              <span class="list-item-text">Explore</span>
            </li>
            <li>
              <icon scale="1.5" name="hashtag" />
              <span class="list-item-text">Trending</span>
            </li>
            <li>
              <icon scale="1.5" name="user" />
              <span class="list-item-text">People</span>
            </li>
            <li>
              <icon scale="1.5" name="bell" />
              <span class="list-item-text">Notifications</span>
            </li>
            <li>
              <icon scale="1.5" name="location-arrow" />
              <span class="list-item-text">Direct</span>
            </li>
            <li>
              <icon scale="1.5" name="cog" />
              <span class="list-item-text">Settings</span>
            </li>
            <li
              @click="logout"
              v-test="{ id: 'logoutButton' }"
              data-cy="logout"
            >
              <icon scale="1.5" name="sign-out-alt" />
              <span class="list-item-text">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/bars";
import "vue-awesome/icons/plus";
import "vue-awesome/icons/envelope";
import "vue-awesome/icons/heart";
import "vue-awesome/icons/times";
import "vue-awesome/icons/user-circle";
import "vue-awesome/icons/home";
import "vue-awesome/icons/compass";
import "vue-awesome/icons/hashtag";
import "vue-awesome/icons/user";
import "vue-awesome/icons/bell";
import "vue-awesome/icons/location-arrow";
import "vue-awesome/icons/cog";
import "vue-awesome/icons/sign-out-alt";
import { mapActions, mapGetters } from "vuex";
import Test from '../directives/test'
export default {
    directives: { Test },
    component: { Icon },
    data: () => ({
    drawer: false,
    loading: false,
  }),
  methods: {
    ...mapActions({
      signOut: "auth/logout",
      getPosts: "posts/getPosts",
    }),
    routeToCreate(){
      this.$router.push('/create')
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    logout() {
      this.signOut();
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      posts: "posts/getPosts",
    }),
  },
  async created() {
    this.loading = true;
    await this.getPosts();
    this.loading = false;
  }
    
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 8vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  .menu {
    color: #ccc;
    flex: 2;
    margin-left: 20px;
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    list-style: none;

    li{
      margin: 5px;
    }

    .create-button {
      background-color: #e7596f;
      border-radius: 5px;
      color: #fff;
      width: 130px;
      height: 40px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      border: none;
      cursor: pointer;

      .btn-text {
        font-size: 1rem;
      }
    }

    .envelope,
    .heart {
      color: #ccc;
      cursor: pointer;

      &:hover {
        color: #e7596f;
      }
    }
  }
}

.navigation-drawer {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 300px;
  display: flex;
  flex-direction: column;
  background: #fff;
  z-index: 5;
  margin: -10px;

  .close{
    margin: 20px;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }

  .logo {
    width: 130px;
    height: 45px;
    align-self: center;
    padding: 10px;
  }

  .avatar {
    color: #e7596f;
    align-self: center;
  }

  .title {
    align-self: center;
    padding: 1rem;
  }

  .info {
    display: flex;
    justify-content: space-around;
    align-items: center;

    h1 {
      font-size: 1rem;
    }

    p {
      text-align: center;
    }
  }

  .list-item {
    ul {
      list-style: none;

      li {
        padding: 10px;
        border-radius: 5px;
        width: 200px;
        cursor: pointer;

        .list-item-text {
          padding-left: 10px;
          font-size: 1rem;
        }

        &:hover {
          color: #fff;
          background-color: #e7596f;
        }
      }
    }
  }
}

.modal{
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 1;
  margin: -10px;
}

a {
  text-decoration: none;
}

.drawer-enter-active {
  transition: transform 0.3s ease-out;
}

.drawer-leave-active{
  transition: transform 0.3s ease-in;
}

.drawer-enter, .drawer-leave-to{
  transform: translateX(-200px)
}

.drawer-enter-to, .drawer-leave{
  transform: translateX(0);
}

.modal-enter-active {
  transition: opacity 0.3s ease-out;
}

.modal-leave-active{
  transition: opacity 0.3s ease-in;
}

.modal-enter, .modal-leave-to{
  opacity: 0
}

.modal-enter-to, .modal-leave{
  opacity: 1
}
</style>