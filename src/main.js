import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import vueCustomScrollbar from 'vue-custom-scrollbar'

import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
// import functions from 'firebase-functions'
// import 'firebase-admin'

firebase.initializeApp({
  apiKey: "AIzaSyAIUAdeD_LaiUNdXGhub79dGVMVYW6g6F0",
  authDomain: "store-vue.firebaseapp.com",
  databaseURL: "https://store-vue.firebaseio.com",
  projectId: "store-vue",
  storageBucket: "store-vue.appspot.com",
  messagingSenderId: "702330006236",
  appId: "1:702330006236:web:c76ffe2571290b0bef2219"
})
export const db = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()
export const functions = firebase.functions()

export const bus = new Vue()

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
