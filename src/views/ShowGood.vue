<template>
  <div class="grid">
    <div class="main_container">
      <div class="img">
        <img :src="data.img" alt="" />
      </div>
      <div class="card_content">
        <div class="season field">New Season</div>
        <div class="brand field">{{ data.brand }}</div>
        <div class="title field">{{ data.title }}</div>
        <div class="price field">{{ data.price }} ₽</div>
        <select class="sizes select field">
          <option class="size" v-for="size in data.size" :key="size">{{
            size
          }}</option>
        </select>
        <div class="buttons_wrap field">
          <button class="btn">Add To Cart</button>
          <div class="btn" @click="favorite">♥</div>
        </div>
        <div class="delivery_date">
          Estimated delivery date
        </div>
      </div>
    </div>
    <div class="about_good">
      <div class="season field"></div>

      <ul>
        <li class="filter_item dropdown">
          <div class="openDropdown" @click="aboutGood = !aboutGood">
            About good
          </div>
          <ul v-if="aboutGood" class="dropdown_list">
            <li class="dropdown_item season">New Season</li>
            <li class="dropdown_item">
              ITEM
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { auth } from "@/main";

export default {
  props: {
    sneacker: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    data: [],
    like: false,
    aboutGood: false
  }),
  mounted() {
    //   console.log(this.sneacker.data())
    this.data = this.sneacker.data();
    this.favorite();
    //   console.log(this.data)
  },
  methods: {
    likeIt() {
      this.like = true;
      //   alert(this.like)
    },
    favorite() {
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log("USER", user);
          db.collection("users")
            .doc(user.uid)
            .collection("favorites")
            .doc(this.sneacker.id)
            .set({
              brand: this.data.brand,
              img: this.data.img,
              title: this.data.title
            })
            .then(() => {
              console.log("collection create");
              this.$refs.like.style.background = "red";
            });
        }
      });
    },
    unFavorite() {
      auth.onAuthStateChanged(user => {
        if (user) {
          db.collection("users")
            .doc(user.uid)
            .collection("favorites")
            .doc(this.sneacker.id)
            .delete()
            .then(() => {
              this.$refs.unLike.style.background = "blue";
            });
        }
        //   .then(doc => {
        //     if (doc.exist) {
        //       doc.delete();
        //       console.log("delete");
        //       this.$refs.unLike.style.background = "red";
        //     }
        //   });
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.grid
  display: grid
  grid-template-columns: 5vw 1fr 5vw

  .main_container
    grid-column: 2
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 50px

  .img
    grid-column: 1

    img
      width: 100%
      float: left

  .card_content
    grid-column: 2
    display: flex
    flex-direction: column
    justify-content: center

    .likes
      display: flex

      .like
        display: inline-block

    .brand
      font: 35px 'Squada One', cursive

    .title

    .price

    .sizes
      width: 100%

    .buttons_wrap
      display: grid
      grid-template-columns: 2fr 1fr
      grid-column-gap: 10px

      .btn

    .delivery_date

  .about_good
    text-align: left
    grid-column: 2
    grid-row: 2

    .openDropdown
      font: 35px 'Squada One', cursive

      &:after
        content: ""
        margin-top: 10px
        // border-bottom: 2px solid
        border-top: 2px solid
        width: 100%
        display: block
.season
  color: gold
  text-transform: lowercase
</style>
