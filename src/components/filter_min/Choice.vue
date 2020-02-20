<template>
  <div class="choice_wrap" ref="choice_wrap">
    <router-link :to="{ name: 'for_her' }">
          <div class="close">close</div>
      </router-link>
    <ul class="choice_list">
      <li class="choice_item-title" @click="openDesigners">Designers</li>
      <li class="choice_item-title" @click="openSizes">Sizes</li>
      <li class="choice_item-title">Colors</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    openDesigners() {
      this.$router.push({ name: "designers" });
    },
    openSizes() {
      this.$router.push({ name: "sizes" });
    }
  }
};
</script>

<style lang="sass" scoped>
.choice_wrap 
</style>