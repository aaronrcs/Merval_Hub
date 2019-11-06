// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client'
import './../node_modules/bulma/css/bulma.css';

// Creating a socket instance for vue
export const SocketInstance = socketio('http://localhost:8082')

// Binding the socket instance to vue
Vue.use(VueSocketIO, SocketInstance)
Vue.config.productionTip = false
let queries = []

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: { queries },
  methods: {}
}).$mount('#app')
