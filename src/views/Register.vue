<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div class="field">
        <input
          ref="first_name"
          class="input"
          type="text"
          placeholder="Input your first name"
        />
      </div>
      <div class="field">
        <input
          ref="last_name"
          class="input"
          type="text"
          placeholder="Input your last name"
        />
      </div>
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
import { db } from "@/main";
import { auth } from "@/main";

export default {
  methods: {
    register() {
      auth
        .createUserWithEmailAndPassword(
          this.$refs.email.value,
          this.$refs.password.value
        )
        .then(cred => {
          return db
            .collection("users")
            .doc(cred.user.uid)
            .set({
              first_name: this.$refs.first_name.value,
              last_name: this.$refs.last_name.value
            });
        });
    }
  }
};
</script>

<style lang="sass" scopeed></style>
