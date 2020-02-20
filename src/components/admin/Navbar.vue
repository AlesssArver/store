<template>
  <nav class="navbar">
    <ul class="nav_list">
      <li class="nav_item logged-out" ref="nav_loggedOut">
        <router-link :to="{ name: 'admin_login' }">
          Login
        </router-link>
      </li>
      <li class="nav_item" ref="nav_addAdmin">
        <router-link :to="{ name: 'add_admin' }">
          Add Admin
        </router-link>
      </li>
      <li class="nav_item" ref="nav_addGoods">
        <router-link :to="{ name: 'add_goods' }">
          Add Goods
        </router-link>
      </li>
      <li class="nav_item" ref="nav_logout">
        <a href="#" class="logout" @click="logout">
          Logout
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import * as firebase from "firebase";
const functions = firebase.functions();
const auth = firebase.auth();

export default {
  mounted() {
    auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          console.log("admin token: ", idTokenResult.claims.admin);
          this.$refs.nav_loggedOut.style.display = "none";
          this.$refs.nav_addAdmin.style.display = "block";
          this.$refs.nav_logout.style.display = "block";
          this.$refs.nav_addGoods.style.display = "block";
        });
      } else {
        this.$refs.nav_loggedOut.style.display = "block";
        this.$refs.nav_addAdmin.style.display = "none";
        this.$refs.nav_logout.style.display = "none";
        this.$refs.nav_addGoods.style.display = "none";
        console.log("U are not registered");
      }
    });
  },
  methods: {
    logout() {
      auth.signOut();
      console.log("U are logged out");
    }
  }
};
</script>
