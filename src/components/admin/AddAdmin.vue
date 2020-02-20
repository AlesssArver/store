<template>
  <div>
    <h1>Add Admin</h1>
    <form @submit.prevent="add_admin" ref="add_admin-form">
    <div class="field">
      <input
        ref="email"
        class="input"
        type="email"
        placeholder="Input your email"
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
    add_admin() {
      const addAdmin = functions.httpsCallable('addAdmin')
      addAdmin({ email: this.$refs.email.value }).then(res => console.log(res))
    }
  }
}
</script>