import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import './static/style/iconfont.css'
// import {router,RouterMount} from './js/router.js'  //路径换成自己的

Vue.use(uView);
// Vue.use(router);
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
