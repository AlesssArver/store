<template>
  <div class="choice_wrap" ref="choice_wrap">
    <router-link :to="{ name: 'choice' }">
      <div class="close">close</div>
    </router-link>
    <div class="content">
      <div class="title">Designers</div>
      <ul v-for="filter in filters" :key="filter.id" class="choice_list">
        <li v-for="brand in filter.brands" :key="brand" class="choice_item">
          <input type="checkbox" class="checkbox" :id="brand" />
          <label :for="brand" class="dropdown_item-title">{{ brand }}</label>
        </li>
      </ul>
    </div>
    <ApplyBtn />
  </div>
</template>

<script>
import ApplyBtn from "./ApplyBtn";

export default {
  props: {
    filters: Object
  },
  components: { ApplyBtn }
};
</script>

<style lang="sass" scoped>
.choice_wrap 
  justify-content: space-evenly
</style>
