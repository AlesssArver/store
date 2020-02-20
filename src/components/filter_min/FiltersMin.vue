<template>
  <div class="filters_min" ref="filters">
    <router-view :filters="filters" />
  </div>
</template>

<script>
import { db } from "@/main";
import Designers from "./Designers";

export default {
  components: { Designers },
  data: () => ({
    showSizes: false,
    showColors: false,
    filters: [],
    colorKeys: []
  }),
  mounted() {
    this.getFilters();
    console.log(this.$router.app._route.name);
  },
  methods: {
    async getFilters() {
      let snapshot = await db
        .collection("filters")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            let appData = doc.data();
            appData.id = doc.id;
            const colorKey = Object.keys(appData.colors);
            colorKey.forEach(key => this.colorKeys.push(key));
            this.filters.push(appData);
          });
        });
    }
  }
};
</script>

<style lang="sass" scopped>
.filters_min
    width: 100%
    display: grid
    grid-template-columns: 1fr
    position: fixed
    top: 63px

    .filter_min-btns
        width: 100%
        display: grid
        grid-gap: 20px

        .filter_btn

            &:hover
                background: #000
                color: #fff

    .choice_wrap 
        justify-content: space-evenly
        padding: 0 5vw 
        height: 92.2vh
        background: #fff
        display: flex
        flex-direction: column
        // display: none
        position: relative
        align-items: start
        text-align: left

        .close
            // margin-bottom: 50px
            float: right
            cursor: pointer
         
        .title 
          margin-bottom: 25px
          font-size: 3em
          font-family: 'Squada One', cursive

        .choice_list
            display: flex
            flex-direction: column
            justify-content: center

            .choice_item-title
                margin-top: 70px
                font-size: 4em
                text-transform: uppercase
                cursor: pointer
                letter-spacing: 6px
                transition: all 0.5s ease
                position: relative
                font-family: 'Squada One', cursive

                &:nth-child(1)
                    margin-top: 0

                &:after
                    content: ""
                    margin: auto
                    margin-top: 10px
                    border-top: 2px solid
                    width: 300px
                    display: block
                    position: absolute
                    left: 0

                &:hover
                    transform: scale(1.1)

            .choice_item 
              margin: 10px 0
              font-size: 25px
</style>
