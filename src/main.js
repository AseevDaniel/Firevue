import Vue from 'vue'
import App from './App.vue'
import Main from './Main.vue'
import User from './components/User.vue'
import firebase from 'firebase'
//import firebaseui from 'firebaseui'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import Vuex from 'vuex';
import axios from 'axios'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore"

window.axios = require('axios');
//... configure axios...
Vue.prototype.$http = window.axios;

Vue.use(Vuex);
Vue.use(firestorePlugin)
firebase.initializeApp({
 projectId: 'firevue0864',
 databaseURL: 'https://firevue0864.firebaseio.com',
 apiKey: "AIzaSyDqSpw6l_n_hCi7lqfVTMSauKM1YhkZ6ig",
 authDomain: "firevue0864.firebaseapp.com",
 storageBucket: "firevue0864.appspot.com",
 messagingSenderId: "85280099974",
 appId: "1:85280099974:web:6d2cc9279d44a02eb34b07",
 measurementId: "G-81K3ESV0BD"
})

const routes = [
  { path: '/', component: Main, props: true},
  { path: '/', component: App, props: true},
  { path: '/user/:name/:email', component: User, props: true}
]

const router = new VueRouter({
  routes
})

//const db = firebase.firestore();
//var storage = firebase.storage ();
//var ui = firebaseui.auth.AuthUI(firebase.auth());
//var rootRef = firebase.database().ref();

/* Bind firebase to your Vue instance */
Vue.prototype.$firebase = firebase;
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user: '',
    email: '',
  },
  mutations: {
    changeUser (state, user) {
      state.user = user
    },
    changeEmail (state, email) {
      state.email = email
    }
  },
  plugins: [
    createPersistedState({
      getStateUser: (user) => Cookies.getJSON(user),
      setStateUser: (user, state) => Cookies.set(user, state, {}),
      getStateEmail: (email) => Cookies.getJSON(email),
      setStateEmail: (email, state) => Cookies.set(email, state, {})
    })
  ]
})

new Vue({
  //storage,
  //db,
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app')
