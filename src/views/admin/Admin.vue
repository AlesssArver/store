<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/admin/Navbar'
import * as firebase from "firebase";
const functions = firebase.functions();
const auth = firebase.auth();

export default {
  components: { Navbar }
};
</script>

<style lang="sass">
.navbar
  margin-bottom: 50px
  padding: 15px 0
  width: 100%
  background: #1898ed
  color: #fff

  .nav_list
    display: flex

  .nav_item
    margin: 0 15px
    list-style: none
</style>
