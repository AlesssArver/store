<template>
  <div class="grid">
    <Filters />
    <h1 class="goods_title">ForHer</h1>
    <div class="goods_container">
      <GoodCard
        v-for="sneacker in sneackers"
        :key="sneacker.id"
        :sneacker="sneacker"
      />
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import Filters from "@/components/Filters";
import GoodCard from "@/components/GoodCard";

export default {
  components: { Filters, GoodCard },
  data: () => ({
    sneackers: []
  }),
  mounted() {
    this.getSneackers();
  },
  methods: {
    async getSneackers() {
      let snapshot = await db
        .collection("sneackers")
        .where("for_him", "==", true)
        .get();
      let sneackers = [];
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        sneackers.push(appData);
        // console.log(doc.data());
      });
      this.sneackers = sneackers;
    }
  }
};
</script>

<style lang="sass" scoped>
.goods_title

.goods_container
    margin: 0 10vw
    margin-top: 50px
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
    grid-gap: 20px
</style>
