<template>
    <router-link tag="a" class="card_link" :to="{ name: 'show_good', params: { id: sneacker.id } }">
      <div class="card">
        <div class="content">
          <img :src="sneacker.img" alt="" />
          <div class="brand">{{ sneacker.brand }}</div>
          <div class="price">{{ sneacker.price }} ₽</div>
        </div>
      </div>
    </router-link>
</template>

<script>
export default {
  props: {
    sneacker: Object
  }
};
</script>

<style lang="sass" scoped>
// .card
//     padding: 10px 0
//     max-width: 300px
//     height: 270px
//     display: block
//     cursor: pointer
//     background: red
.card
    padding: 10px 0
    display: block
    cursor: pointer
    background: #fff
    
    img
        width: 100% 

    .brand 
      font: 20px 'Squada One', cursive
      letter-spacing: 1px
</style>
