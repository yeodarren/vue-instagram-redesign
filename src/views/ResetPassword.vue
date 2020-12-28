<template>
  <div class="container">
    <h1 class="title">Reset Password</h1>
    <form v-if="!showSuccess" @submit.prevent="submitForm" v-test="{id: 'form'}" data-cy="reset-form">
      <label>Email</label>
      <input type="email" v-model="email" placeholder="Enter email" data-cy="reset-email"/>
      <span v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty"
          >Email is required!</span
        >
      <div class="actions">
        <button @click="goBack" class="return" v-test="{id: 'returnButton'}" data-cy="return-button">
          Go Back
        </button>
        <button type="submit" class="submit">Submit</button>
      </div>
    </form>
    <div v-else-if="errorMsg" data-cy="error">
      <h3>
        {{ errorMsg }}
        <span
          ><button @click="goBack" class="return" v-test="{id: 'returnButton'}" data-cy="return-button">
            Go Back
          </button></span
        >
      </h3>
    </div>
    <div v-else data-cy="success">
      <h3>Success! Check your email for a reset link. <span
          ><button @click="goBack" class="return" v-test="{id: 'returnButton'}" data-cy="return-button">
            Go Back
          </button></span
        ></h3>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { auth } from "@/firebase/firebase";
import Test from '../directives/test'
export default {
  directives: { Test },
  data() {
    return {
      email: "",
      showSuccess: false,
      errorMsg: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    goBack() {
      this.$router.push("/login");
    },
    async submitForm() {
      this.$v.$touch();

      try {
        await auth.sendPasswordResetEmail(this.email);
      } catch (err) {
        this.errorMsg = err.message;
      }

      this.showSuccess = true;
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

    .actions {
      display: flex;

      button {
        margin-top: 10px;
        margin-right: 10px;
        width: 120px;
        height: 35px;
        color: white;
        background-color: #2196f3;
        border-radius: 5px;
        border: none;
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
}

button {
  margin-top: 10px;
  margin-right: 10px;
  width: 120px;
  height: 35px;
  color: #2196f3;
  background: none;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

h3 {
  text-align: center;
}

@media (max-width: 768px) {
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
