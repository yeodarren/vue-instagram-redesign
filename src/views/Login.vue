<template>
  <div>
    <div class="container">
      <img v-test="{id: 'logo'}" class="logo" src="../assets/instagram_logo.png" alt="logo" />
      <form class="login-form" v-if="showLoginForm" @submit.prevent="login" v-test="{id: 'loginForm'}" data-cy="login-form">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Enter email" v-test="{id: 'email'}" data-cy="login-email"/>
        <span v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty"
          >Email is required!</span
        >
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="Enter password"
          v-test="{id: 'password'}"
          data-cy="login-password"
        />
        <span v-if="!$v.password.required && $v.password.$dirty"
          >Password is required!</span
        >
        <span v-if="!$v.password.minLength && $v.password.$dirty"
          >Password must have at least 6 characters!</span
        >
        <button type="submit">Login</button>
        <div class="toggle-form">
          Don't have an account?
          <span class="register" @click="toggleForm" v-test="{id: 'toggleForm'}" data-cy="toggle-form">Register</span>
        </div>
        <router-link to="/resetpassword" data-cy="reset-password">Forgot password?</router-link>
      </form>
      <form class="register-form" v-else @submit.prevent="register" v-test="{id: 'registerForm'}" data-cy="register-form">
        <label>Username</label>
        <input type="text" v-model="username" placeholder="Enter username" data-cy="register-username" />
        <span v-if="!$v.username.required && $v.username.$dirty"
          >Username is required!</span
        >
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Enter email" data-cy="register-email"/>
        <span v-if="!$v.email.required && $v.email.$dirty"
          >Email is required!</span
        >
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="Enter password"
          data-cy="register-password"
        />
        <span v-if="!$v.password.required && $v.password.$dirty"
          >Password is required!</span
        >
        <span v-if="!$v.password.minLength && $v.password.$dirty"
          >Password must have at least 6 characters!</span
        >
        <button class="login-button" type="submit">Register</button>
        <div class="toggle-form">
          Already have an account?
          <span class="login" @click="toggleForm" v-test="{id: 'toggleForm'}" data-cy="toggle-form">Login</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions } from 'vuex'
import Test from '../directives/test'
export default {
  directives: { Test },
  data() {
    return {
      showLoginForm: true,
      username: "",
      email: "",
      password: "",
    };
  },
  validations: {
    username: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    ...mapActions({
      signIn: "auth/login",
      signUp: "auth/register",
    }),
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    login() {
      this.$v.$touch();
      this.signIn({
        email: this.email,
        password: this.password,
      })
    },
    register() {
      this.$v.$touch();
      this.signUp({
        name: this.username,
        email: this.email,
        password: this.password,
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

  .logo {
    height: 100%;
    width: 300px;
    display: flex;
    align-self: center;
  }

  .login-form,
  .register-form {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-self: center;

    label {
      text-align: initial;
      padding: 10px 0;
    }

    input {
      padding: 5px;
      font-size: 1rem;
    }

    button {
      margin-top: 10px;
      width: 120px;
      height: 35px;
      color: white;
      background-color: #2196f3;
      border-radius: 5px;
      border: none;
      font-size: 1rem;
      cursor: pointer;
    }

    .toggle-form {
      text-align: initial;
    }

    .forgot-password {
      text-align: initial;
    }

    .register,
    .login {
      cursor: pointer;
      color: blue;

      &:hover{
          text-decoration: underline;
      }
    }

    .toggle-form {
      margin-top: 10px;
    }

    a {
      text-decoration: none;
      text-align: initial;

      &:hover{
          text-decoration: underline;
      }
    }

    span {
      color: red;
      text-align: initial;
      padding-top: 10px;
    }
  }
}
</style>
