import request from './http.js' //引入http.js
const api = request
export default {
	addUser: (data) =>{
		return api.request('/appusers','POST',data);
	},
	getAllUser: (data) => {
		return api.request('/users', 'GET', data) //接口地址
	},
	upload: (data) => {
		return api.request('/ccf/dds', 'POST', data, true) //上传接口地址
	},
	valicode: (data) => {
		let str = '/auth/code1?phone=' + data;
		return api.request(str, 'POST', data) //接口地址
	},
	vfcode: (data) => {
		return api.request('/auth/vfcode', 'POST', data) //接口地址
	},
	Login:(data) => {
		return api.request('/auth/login', 'POST', data) //接口地址
		
	}
}
