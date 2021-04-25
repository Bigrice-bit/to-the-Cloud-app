import Vue from 'vue'
import App from './App'
import uView from "uview-ui";

import Api from 'app/app.js'// 1、引入app.js
Vue.use(uView);

Vue.config.productionTip = false

Vue.prototype.$Api = Api//  2、挂载全局

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
