<template>
  <router-link
    tag="a"
    class="card_link"
    :to="{ name: 'edit_good', params: { id: sneacker.id } }"
  >
    <div class="card" ref="card">
      <div class="card_header">
        <div class="card_delete" @click="deleteGood">delete</div>
      </div>
      <div class="content">
        <img
          :src="sneacker.img"
          :alt="'Brand: ' + sneacker.brand + ' ' + 'Title: ' + sneacker.title"
        />
        <div class="brand">{{ sneacker.brand }}</div>
        <div class="price">{{ sneacker.price }} ₽</div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { db } from "@/main";

export default {
  props: {
    sneacker: Object
  },
  methods: {
    deleteGood() {
      db.collection("sneackers")
        .doc(this.sneacker.id)
        .delete()
        .then(() => console.log("Good deleted"));
    }
  }
};
</script>

<style lang="sass" scoped>
.card
    padding: 10px 0
    height: 270px
    display: block
    cursor: pointer
    background: white

    img
        width: 200px

    .card_delete
      background: red
      cursor: pointer
</style>
