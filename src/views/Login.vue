<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
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
import { auth } from "@/main";

export default {
    methods: {
        login() {
            auth.signInWithEmailAndPassword(this.$refs.email.value, this.$refs.password.value)
        }
    }
}
</script>

<style lang="sass" scopeed>

</style>