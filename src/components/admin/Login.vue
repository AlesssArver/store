<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login" ref="login-form">
    <div class="field">
      <input
        ref="email"
        class="input"
        type="email"
        placeholder="Input your email"
      />
    </div>
    <div class="field">
      <input
        ref="password"
        class="input"
        type="password"
        placeholder="Input your password"
      />
    </div>
    <div class="field">
      <button class="btn">Submit</button>
    </div>
  </form>
  </div>
</template>

<script>
import * as firebase from "firebase";
const functions = firebase.functions();
const auth = firebase.auth();

export default {
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(
          this.$refs.email.value,
          this.$refs.password.value
        )
        .then(() => {
          this.$refs.email = ''
          this.$refs.password = ''
        });
    }
  }
};
</script>
