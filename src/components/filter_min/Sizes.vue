<template>
  <div class="choice_wrap" ref="choice_wrap">
    <router-link :to="{ name: 'choice' }">
      <div class="close">close</div>
    </router-link>
    <div class="title">Sizes</div>
    <ul v-for="filter in filters" :key="filter.id" class="sizes">
      <li
        v-for="size in filter.sizes"
        :key="size"
        class="dropdown_item size_item"
      >
        <div class="box">{{ size }}</div>
      </li>
    </ul>
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

.sizes
    width: 100%
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 10px
    text-align: center

    .size_item
        cursor: pointer

        .box
            padding: 20px 0
            background: #f7f7f7
            border-radius: 10px
            font-weight: bold

            &:active
                border: 1px solid
</style>
