<template>
  <div class="filters_min" ref="filters">
    <div class="filter_min-btns" ref="filter_min_btns">
      <button class="filter_btn" @click="openChoice">Choice</button>
      <button class="filter_btn">Sort</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openChoice() {
      this.$router.push({ name: "choice" });
    }
  }
};
</script>

<style lang="sass" scoped>
.filters_min
    width: 100%
    display: grid
    grid-template-columns: 5vw 1fr 5vw
    position: fixed
    top: 80px

    .filter_min-btns
        width: 100%
        display: grid
        grid-column: 2
        grid-template-columns: 1fr 1fr 
        grid-gap: 20px

        .filter_btn
            padding: 13px 30px
            background: none
            border: 1px solid
            border-radius: 10px
            font-size: 18px
            letter-spacing: 1px
            text-transform: uppercase
            cursor: pointer
            transition: all 0.3s ease

            &:nth-child(1)
                grid-column: 1

            &:hover
                background: #000
                color: #fff
</style>
