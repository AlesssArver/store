<template>
  <div>
    <transition name="modal">
      <div class="modal_wrap" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal_img">
            <img :src="data.img" alt="" />
          </div>
          <div class="modal_content">
            <div class="modal-header">
              <slot name="header">
                <h3 v-if="!editBrand" @click="editBrand = !editBrand">
                  {{ data.brand }}
                </h3>
                <input
                  @keyup.enter="updateBrand"
                  v-else
                  type="text"
                  class="input"
                  ref="brand"
                  :value="data.brand"
                />
              </slot>
            </div>

            <div class="modal_body">
              <h4 v-if="!editTitle" @click="editTitle = !editTitle">
                {{ data.title }}
              </h4>
              <input
                @keyup.enter="updateTitle"
                v-else
                type="text"
                class="input"
                ref="title"
                :value="data.title"
              />
              <ul class="sizes" ref="sizes" v-if="!editSize">
                <li
                  class="size"
                  v-for="size in data.size"
                  :key="size"
                  @click="editSize = !editSize"
                >
                  {{ size }}
                </li>
              </ul>
              <div class="sizes_edit_wrap">
                <ul class="sizes_edit">
                  <li
                    @keyup.enter="updateSize"
                    class="size_edit"
                    v-for="size in data.size"
                    :key="size"
                  >
                    <input type="number" ref="size" :value="size" />
                  </li>
                </ul>
              </div>
            </div>
            <div class="modal_footer"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  props: {
    sneacker: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    data: [],
    editBrand: false,
    editTitle: false,
    editSize: false
  }),
  mounted() {
    this.data = this.sneacker.data();
    this.data.id = this.sneacker.id;
  },
  methods: {
    closeModal() {
      this.$router.push({ name: "add_goods" });
    },
    updateBrand() {
      db.collection("sneackers")
        .doc(this.sneacker.id)
        .update({ brand: this.$refs.brand.value })
        .then(() => console.log("Brand updated"));
    },
    updateTitle() {
      db.collection("sneackers")
        .doc(this.sneacker.id)
        .update({ title: this.$refs.title.value })
        .then(() => console.log("Title updated"));
    },
    updateSize(e) {
      db.collection("sneackers")
        .doc(this.sneacker.id)
        .update({
          size: this.$refs.size.value
        })
        .then(() => console.log("Size updated"));
    },
    addSize() {
      // db.collection("sneackers")
      //   .doc(this.sneacker.id)
      //   .update({
      //     size:
      //   })
    }
  }
};
</script>

<style lang="sass" scoped>
.modal_wrap
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  position: fixed
  top: 0
  left: 0
  display: flex
  justify-content: center
  align-items: center
  transition: opacity 1s ease
  z-index: 1


.modal-container
  width: 80vw
  margin: 0 auto
  padding: 20px 30px
  background: #fff
  border-radius: 20px
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33)
  transition: all 1s ease
  display: grid
  grid-template-columns: 1fr 1fr

  .modal_img
    grid-column: 1

    img
      max-width: 350px

  .modal_content
    grid-column: 2
    text-align: left
    display: flex
    flex-direction: column
    justify-content: space-between


    .modal-header

      h3
        color: #42b983


    .modal_body
      margin: 20px 0

      .sizes
        margin: 20px 0

        .size
          margin-right: 10px
          padding: 10px
          background: pink
          border-radius: 10px
          color: blue
          font-weight: bold
          display: inline-block

      .sizes_edit_wrap

        .sizes_edit
          margin: 20px 0
          display: flex

          .size_edit

            input
              margin-right: 6px
              padding: 10px
              width: 20px
              border: none
              border: 2px solid pink
              border-radius: 10px
              color: blue
              font-size: 18px
              font-weight: bold

    .modal_footer
      display: flex
      justify-content: flex-end


      .btn

    .modal-enter
      opacity: 0


    .modal-leave-active
      opacity: 0


    .modal-enter .modal-container,
    .modal-leave-active .modal-container
      -webkit-transform: scale(1.1)
      transform: scale(1.1)
</style>
