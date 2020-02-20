<template>
  <div class="grid">
    <div class="filters_wrapper">
      <Filters />
    </div>
    <div class="filters_wrapper_min">
      <FiltersMin />
    </div>
    <div class="content">
      <div class="goods_title">ForHer</div>
      <div class="goods_container">
        <GoodCard
          v-for="sneacker in sneackers"
          :key="sneacker.id"
          :sneacker="sneacker"
        />
        <!-- <div class="for" v-for="sneacker in sneackers" :key="sneacker.id">
          <img :src="sneacker.img" alt="" />
          {{ sneacker.brand }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { bus } from "@/main";
import Filters from "@/components/Filters";
import FiltersMin from "@/components/filter_min/MainBtns";
import GoodCard from "@/components/GoodCard";

export default {
  components: { Filters, FiltersMin, GoodCard },
  data: () => ({
    sneackers: [],
    sneackers2: [],
    data: []
  }),
  watch: {
    sneackers: function(val) {
      let a = Array.from(new Set([8, 2, 2, 5]));
  
      // есть дубликаты в массиве
      // this.sneackers = Array.from(new Set(val))
      
      // infinity loop
      // val.forEach(data => {
      // let b = Array.from(new Set([data]))
      // this.sneackers = b
      // console.log(new Set([data]))
      // })

      // ничего не вижу в консоли
      // bus.$on("filter", data => {
      //   val = data;
      //   this.sneackers.push(val);
      //   console.log(this.sneackers);
      // });
    }
  },
  mounted() {
    // this.getSneackers();
  },
  methods: {
    getSneackers() {
      this.data.filter(data => {
        console.log(data);
        db.collection("sneackers")
          .where("brand", "==", data.brand)
          .get();
        let sneackers = [];
        snapshot.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;
          sneackers.push(appData);
          console.log(this.sneackers);
        });
        this.sneackers = sneackers;
      });
    },
    filter(val) {
      // dont working
      // this.sneackers.push(new Set([val]))
      
      // dont working
      // let data = new Set([val]);
      // data.forEach(doc => {
      //   this.sneackers.push(doc);
      // });
    }
  }
};
</script>

<style lang="sass" scoped>
.grid
  display: grid
  grid-template-columns: 300px 50px 1fr 50px

  .filters_wrapper
    grid-column: 1

  .filters_wrapper_min
    display: none

  .content
    grid-column: 3

.goods_title
  font-size: 35px
  font-weight: 700

.goods_container
    margin-top: 50px
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
    grid-gap: 50px

@media screen and (max-width: 1050px)
  .grid
    grid-template-columns: 50px 1fr 50px

    .filters_wrapper
      display: none

    .filters_wrapper_min
      grid-column: 1 / -1
      display: block

    .content
      grid-column: 2

      .goods_container
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
        grid-gap: 50px

// @media screen and (max-width: 550px)
//   .grid
//     grid-template-columns: 20px 1fr 20px

//     .goods_container
//       grid-template-columns: repeat(auto-fit, minmax(200px, 400px))

// @media screen and (max-width: 550px)
//   .grid
//     grid-template-columns: 20px 1fr 20px

//     .goods_container
//       grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
//       grid-gap: 50px
</style>
