import request from './http.js' //引入http.js
const api = request
export default {
	addUser: (data) =>{
		return api.request('/appusers','POST',data);
	},
	getUserInfo: (data) => {
		return api.request('/aab/ccd', 'POST', data) //接口地址
	},
	upload: (data) => {
		return api.request('/ccf/dds', 'POST', data, true) //上传接口地址
	},
	test: (data) => {
		return api.request('/aabb', 'GET', data) //接口地址
	}
}
