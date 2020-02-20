<template>
  <div class="grid">
    <h1 class="page_title">Add Gods</h1>

    <div class="goods_container">
      <div class="filter">
        <input type="text" class="input search" />
        <div class="sort dropdown">
          <div class="openDropdown">Sort By</div>
          <ul class="sort_list dropdown_list">
            <li class="sort_list_item dropdown_item">
              Newest
            </li>
            <li class="sort_list_item dropdown_item">
              Price: high to low
            </li>
            <li class="sort_list_item dropdown_item" @click="lowToHigh = true">
              Price: low to high
            </li>
          </ul>
        </div>
      </div>

      <div class="good_card">
        <GoodCard
          v-for="sneacker in sneackers"
          :key="sneacker.id"
          :sneacker="sneacker"
        />
      </div>

      <!-- <div class="scroll_bar">
        <div class="scroll_bar_scroll"></div>
      </div> -->
    </div>

    <div class="third_column">
      <AddForm />
    </div>
    <router-view />
  </div>
</template>

<script>
import * as firebase from "firebase";
import { db } from "@/main";
import AddForm from "@/components/admin/addGoods/AddForm";
import GoodCard from "@/components/admin/addGoods/GoodCard";

export default {
  components: { AddForm, GoodCard },
  data: () => ({
    sneackers: [],
    lowToHigh: false,
    showModal: false
  }),
  mounted() {
    this.getSneackersLowToHigh();
  },
  methods: {
    async getSneackers() {
      let snapshot = await db
        .collection("sneackers")
        // .where("for_her", "==", true)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            let appData = doc.data();
            appData.id = doc.id;
            this.sneackers.push(appData);
          });
        });
    },
    async getSneackersLowToHigh() {
      let snapshot = await db
        .collection("sneackers")
        // .where("for_her", "==", true)
        .orderBy("price")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            let appData = doc.data();
            appData.id = doc.id;
            this.sneackers.push(appData);
          });
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.grid
  display: grid
  grid-template-columns: minmax(10px, 100px) 2fr 1fr minmax(10px, 100px)

.page_title
  grid-column: 1 / -1

.goods_container
    height: 715px
    grid-column: 2
    padding: 10px 1.5em 10px 10px
    background: red
    border-radius: 20px
    position: relative
    overflow: auto

    .good_card
      display: grid
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
      grid-gap: 20px
      padding: 10px

    .filter
      grid-column: 1 / -1
      display: flex
      justify-content: space-between

      .search
        width: 90%

      .sort
        display: inline-block

      .dropdown
        position: relative

        &:hover

          .dropdown_list
            display: block

        .openDropdown
          padding: 10px

        .dropdown_list
          min-width: 150px
          display: none
          list-style: none
          position: absolute
          top: 40px
          right: 0
          background: #1898ed
          z-index: 1

          .dropdown_item
            margin: 10px 0
            cursor: pointer

          a
            padding: 12px 16px
            display: block

.scroll_bar
  width: 1em
  height: 100%
  background: black
  border-radius: 0 20px 20px 0
  position: absolute
  top: 0
  right: 0
  overflow: hidden

  .scroll_bar_scroll
    width: 1em
    height: 20%
    background: pink
    border-radius: 20px


.third_column
  grid-column: 3

  .form
    float: right
</style>
