<template>
  <nav class="navbar">
    <div class="brand">
      <router-link :to="{ name: 'home' }">
        Brand
      </router-link>
    </div>
    <ul class="nav_list nav_list-left">
      <li class="nav_item after_line">
        <router-link :to="{ name: 'for_her' }">
          for her
        </router-link>
      </li>
      <li class="nav_item">
        <router-link :to="{ name: 'for_him' }">
          for him
        </router-link>
      </li>
    </ul>
    <ul class="nav_list nav_list-right">
      <li class="nav_item logged-in dropdown" ref="profile">
        <router-link class="openDropdown" :to="{ name: 'profile' }">
          profile
        </router-link>
        <ul class="dropdown_list">
          <li class="dropdown_item">
            settings
          </li>
          <li class="nav_item" ref="nav_logout">
            <a href="#" class="logout" @click="logout">
              Logout
            </a>
          </li>
        </ul>
      </li>
      <li class="nav_item logged-out" ref="login">
        <router-link :to="{ name: 'login' }">
          login
        </router-link>
      </li>
      <li class="nav_item logged-out" ref="register">
        <router-link :to="{ name: 'register' }">
          register
        </router-link>
      </li>
    </ul>
    <ul class="nav_list"></ul>
  </nav>
</template>

<script>
import { db } from "@/main";
import { auth } from "@/main";

export default {
  mounted() {
    auth.onAuthStateChanged(user => {
      if (user) {
        // console.log(user.uid);
        this.$refs.profile.style.display = "block";
        this.$refs.nav_logout.style.display = "block";
        this.$refs.login.style.display = "none";
        this.$refs.register.style.display = "none";
      } else {
        this.$refs.profile.style.display = "none";
        this.$refs.nav_logout.style.display = "none";
        this.$refs.login.style.display = "block";
        this.$refs.register.style.display = "block";
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

<style lang="sass" scoped>
.navbar
  display: grid
  grid-template-columns: 5vw 1fr 2fr 1fr 5vw
  padding: 15px 0
  width: 100%
  border-bottom: 1px solid
  color: #000
  align-items: center
  // overflow: hidden
  position: fixed
  top: 0
  width: 100%

  .brand
    grid-column: 3
    grid-row: 1
    font-weight: 700
    font: 30px 'Squada One', cursive

  .nav_list-left
    grid-column: 2

  .nav_list-right
    justify-content: flex-end

  .nav_list
    display: flex
    font: 18px 'Squada One', cursive

    .nav_item
      list-style: none

      &:nth-child(2)
        margin-left: 20px

    .after_line
      position: relative

    .after_line:after
      content: ""
      border-top: 25px solid
      border-right: 1px solid
      display: block
      position: absolute
      right: -10px
      bottom: -3px

    .dropdown
      position: relative
      display: inline-block

      &:hover

        .dropdown_list
          display: block

      .openDropdown
        padding: 15px 0

      .dropdown_list
        min-width: 80px
        display: none
        list-style: none
        position: absolute
        top: 30px
        background: #fff

        .dropdown_item
          margin: 10px 0
</style>
