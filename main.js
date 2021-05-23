import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import Qs from 'qs';
import store from "@/store";


import Api from 'app/app.js'// 1、引入app.js
Vue.use(uView);

Vue.config.productionTip = false


// 混入
//main.js
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

Vue.prototype.$Api = Api//  2、挂载全局

App.mpType = 'app'

const app = new Vue({
	render: h => h(App),
	store,
    ...App
})
app.$mount()
