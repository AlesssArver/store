<template>
  <div>
    <h1>Profile</h1>
    <h2>{{ user.first_name }} {{ user.last_name }}</h2>
    {{ email }}
    <div class="field">
      <input
        @keyup.enter="updateEmail"
        type="email"
        class="input"
        v-model="newEmail"
        placeholder="New Email"
      />
    </div>
    <div class="field">
      <input
        @keyup.enter="updatePassword"
        type="password"
        class="input"
        v-model="newPassword"
        placeholder="New Password"
      />
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { auth } from "@/main";

export default {
  data: () => ({
    user: [],
    email: "",
    newEmail: "",
    newPassword: ""
  }),
  mounted() {
    this.getSneackers();
    // console.log('USER', this.user)
    // this.sneackers.colors.forEach(color => console.log(color))
  },
  methods: {
    getSneackers() {
      auth.onAuthStateChanged(user => {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              //   console.log("User exists");
              //   console.log("USER DATA", user);
              let data = doc.data();
              this.user = data;
              this.email = user.email;
              console.log(this.user.first_name);
            } else console.log("user is not exists");
          });
      });
    },
    updateEmail() {
      auth.currentUser
        .updateEmail(this.newEmail)
        .then(() => console.log("email updated"))
        .catch(err => console.error(err));
    },
    updatePassword() {
      auth.currentUser
        .updatePassword(this.newPassword)
        .then(() => console.log("password updated"))
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="sass" scopped></style>
