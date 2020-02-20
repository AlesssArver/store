<template>
  <div class="filters" ref="filters">
    <ul class="filters_list" v-for="filter in filters" :key="filter.id">
      <li class="filter_item dropdown">
        <div class="openDropdown" @click="showDesigners = !showDesigners">
          Designer
        </div>
        <ul v-if="showDesigners" class="dropdown_list">
          <li v-for="brand in filter.brands" :key="brand" class="dropdown_item">
            <input
              type="checkbox"
              class="checkbox"
              :id="brand"
              ref="checkBrand"
              :value="brand"
              v-model="item"
            />
            <label :for="brand" class="dropdown_item-title" ref="labelBrand">{{
              brand
            }}</label>
          </li>
        </ul>
      </li>
      <li class="filter_item dropdown">
        <div class="openDropdown" @click="showSizes = !showSizes">Sizes</div>
        <ul v-if="showSizes" class="dropdown_list sizes">
          <li
            v-for="size in filter.sizes"
            :key="size"
            class="dropdown_item size_item"
          >
            <div class="box">{{ size }}</div>
          </li>
        </ul>
      </li>
      <li class="filter_item dropdown">
        <div class="openDropdown" @click="showColors = !showColors">Colors</div>
        <ul v-if="showColors" class="dropdown_list colors">
          <li
            v-for="color in filter.colors"
            :key="color"
            class="dropdown_item color"
          >
            <!-- <div class="color_box" :style="{background: color}"></div> -->
            <input
              type="checkbox"
              class="checkColor"
              :style="{ background: color }"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "@/main";
import { bus } from "@/main";

export default {
  data: () => ({
    showDesigners: false,
    showSizes: false,
    showColors: false,
    filters: [],
    item: [],
    sneackers: [],
    colorKeys: [],
    filterBrand: []
  }),
  watch: {
    item: function(val) {
      val.forEach(data => {
        db.collection("sneackers")
          .where("brand", "==", data)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let appData = doc.data();
              appData.id = doc.id;
              
              // this.sneackers = []
              // this.sneackers.push(appData)
              // console.log(this.sneackers)
              // все товары в консоли уникальны

              // не работает
              // bus.$emit("filter", appData);

              // this.$emit("filter", appData);
            });
          });
      });
    }
  },
  mounted() {
    this.getFilters();
  },
  methods: {
    getFilters() {
      db.collection("filters")
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
    },
    event() {},
    op(e) {
      // db.collection("sneackers")
      //   .get()
      //   .then(snapshot => {
      //     snapshot.forEach(doc => {
      //       this.$refs.checkBrand.forEach(check => {
      //         this.$refs.labelBrand.forEach(labelBrand => {
      //           if (
      //             check.checked === true &&
      //             labelBrand.textContent === doc.data().brand
      //           ) {
      //             console.log(doc.data());
      //           }
      //         });
      //       });
      //     });
      //   });
      // db.collection("filters")
      //   .get()
      //   .then(snapshot => {
      //     snapshot.forEach(filter => {
      //       filter.data().brands.forEach(brand => {
      //         console.log(brand)
      //         this.$refs.checkBrand.forEach(check => {
      //           if (check.checked === true && e.target.textContent === brand) {
      //             alert("CHECKED");
      //             console.log(check.checked);
      //             console.log(brand);
      //             db.collection("filters")
      //               .where(e.target.textContent, "==", brand)
      //               .get()
      //               .then(result => {
      //                 result.forEach(doc => {
      //                   let appData = doc.data();
      //                   appData.id = doc.id;
      //                   this.sneackers.push(appData)
      //                   console.log(this.sneackers)
      //                 })
      //               });
      //           }
      //         });
      //       });
      //     });
      // });
      // this.filters.forEach(filter => {
      //   filter.brands.forEach(brand => {
      //     if (e.target.textContent == brand) {
      //       alert("CHECKED")
      //       console.log("BRAND", brand);
      //     }
      //   });
      // });
      // console.log(e.target.textContent);
      // this.filterBrand.push(e.target.textContent);
      // console.log(this.filterBrand)
      // this.filters.forEach(filter => {
      //   filter.brands.forEach(brand => {
      //     this.$refs.checkBrand.forEach(check => {
      //       if (check.checked === true && e.target.textContent === brand) {
      //         alert("CHECKED");
      //         console.log(check.checked);
      //         console.log(brand);
      //       }
      //     });
      //   });
      // });
    }
  }
};
</script>

<style lang="sass" scopped>
.filters
    max-width: 300px
    width: 100%
    padding-top: 30px
    padding-left: 30px
    height: 100%
    background: #fff
    border-right: 1px solid
    position: fixed
    top: 63px
    left: 0
    text-align: left
    font-size: 18px

    .filters_list
      display: flex
      flex-direction: column

      .filter_item
        margin-top: 20px


    .dropdown
      position: relative
      display: inline-block

      .openDropdown
        border-bottom: 1px solid
        cursor: pointer

        &:after
          content: ""
          margin-top: 10px
          // border-bottom: 2px solid
          border-top: 2px solid
          width: 100px
          display: block

      .dropdown_list
        list-style: none

        .dropdown_item
          margin-top: 10px
          cursor: pointer

          .field
            display: flex

      .sizes
        display: grid
        grid-template-columns: repeat(auto-fit, 40px)
        grid-column-gap: 10px

        .box
          padding: 10px
          background: #f7f7f7
          border-radius: 10px
          font-weight: bold

          &:active
            border: 1px solid

      .colors
        display: grid
        grid-template-columns: repeat(auto-fit, 50px)
        grid-gap: 10px

        .color
          display: inline-block

          .checkColor
            -webkit-appearance: none
            padding: 15px
            border-radius: 5px

            &:checked
              padding: 13px
              position: relative
              border: 2px solid

              // &::after
              //   content: ''
              //   padding: 6px
              //   background: #000
              //   opacity: 0.6
              //   border-radius: 2px
              //   display: block
              //   position: absolute
              //   top: 30%
              //   right: 30%

          //   .color_box
          //     border: 1px solid

          // .color_box
          //   margin: 0 5px
          //   width: 30px
          //   height: 30px
          //   border-radius: 5px
          //   cursor: pointer

            // &:nth-child(1)
            //   border: 1px solid
</style>
