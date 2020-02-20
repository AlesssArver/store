<template>
  <div class="form">
    <div class="img_form">
      <div class="field" v-if="imageData != null">
        <p>upload img</p>
        <img v-if="uploadValue == 100" class="preview" :src="picture" />
      </div>

      <div class="field">
        <div class="progress_wrap">
          <div class="progress_value">{{ uploadValue.toFixed() + "%" }}</div>
          <progress class="progress" :value="uploadValue" max="100"></progress>
        </div>
      </div>
      <div class="field">
        <input
          class="input_file"
          type="file"
          accept="image/*"
          @change="previewImage"
          ref="img"
        />
      </div>
      <div class="field">
        <button class="btn" @click="onUpload">upload</button>
      </div>
    </div>

    <form @submit.prevent="addGood" class="form">
      <div class="field_addons">
        <div class="field">
          <label for="for_her">for her</label> <br />
          <input v-model="for_her" type="checkbox" id="for_her" />
        </div>
        <div class="field">
          <label for="for_him">for him</label> <br />
          <input v-model="for_him" type="checkbox" id="for_him" />
        </div>
      </div>
      <div class="field">
        <input v-model="brand" class="input" type="text" placeholder="Brand" />
      </div>
      <div class="field">
        <input class="input" v-model="title" type="text" placeholder="Title" />
      </div>
      <div class="field">
        <input
          class="input"
          type="number"
          v-model="price"
          placeholder="Price"
        />
      </div>
      <div class="field">
        <input class="input" type="text" v-model="color" placeholder="Color" />
      </div>
      <div class="field">
        <select v-model="size" class="select_multiple" multiple>
          <option disabled selected>Size</option>
          <option>35</option>
          <option>36</option>
          <option>37</option>
          <option>38</option>
          <option>39</option>
          <option>40</option>
          <option>41</option>
          <option>42</option>
        </select>
      </div>
      <div class="field">
        <button class="btn">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "@/main";
import { storage } from "@/main";

export default {
  data: () => ({
    for_her: false,
    for_him: false,
    brand: "",
    title: "",
    color: "",
    size: [],
    price: null,
    imageData: null,
    picture: null,
    uploadValue: 0,
    imgUrl: null
  }),
  mounted() {},
  methods: {
    addGood() {
      db.collection("sneackers").add({
        for_her: this.for_her,
        for_him: this.for_him,
        brand: this.brand,
        title: this.title,
        color: this.color,
        size: this.size,
        price: this.price,
        img: this.imgUrl
      });
    },
    previewImage(e) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onUpload() {
      this.picture = null;
      const storageRef = storage
        .ref(`goods`)
        .child(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
            let imgUrl = storage
              .ref("goods")
              .child(`${this.imageData.name}`)
              .getDownloadURL();
            console.log("Url", imgUrl);

            let imgMeta = storage
              .ref("goods")
              .child(`${this.imageData.name}`)
              .getMetadata();
            console.log("Meta", imgMeta);
          });
        }
      );
    }
  }
};
</script>

<style lang="sass" scoped>
.field_addons
  display: inline-flex

.img_form


.preview
    width: 200px

.input_file
  width: 300px
  border: 1px solid lightgray
  border-radius: 20px

  &::before
    margin: 0 7px
    margin-bottom: 5px
    display: inline-block
    -webkit-user-select: none

  &[type="file" i]

  &::-webkit-file-upload-button
    width: 150px
    height: 30px
    border: none
    cursor: pointer

.progress_wrap
  display: inline-block
  position: relative

.progress_value
    position: absolute
    top: 10%
    right: 45%
    color: #fff

.progress
  width: 300px
  height: 1.5em
  border-radius: 20px
  overflow: hidden

  &::-webkit-progress-bar
    -webkit-appearance: none
    background: #52cbff
    // background: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)

  &::-webkit-progress-value
    -webkit-appearance: none
    background: linear-gradient(to left, #9a52ff, #525eff, #52cbff, #8eff52, #ffeb52, #ffae52, #ff6352) // red to violet

.form
  padding: 1px 0
  max-width: 380px
  background: #fff
  border-radius: 20px
</style>
