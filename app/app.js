import request from './http.js' //引入http.js
const api = request
export default {
	addUser: (data) => {
		return api.request('/appusers', 'POST', data);
	},
	getAllUser: (data) => {
		return api.request('/users', 'GET', data) //接口地址
	},
	updateUserInfo: (data) => {
		return api.request('/users', 'PUT', data) //上传接口地址
	},
	valicode: (data) => {
		let str = '/auth/registercode?phone=' + data;
		return api.request(str, 'POST', data) //接口地址
	},
	vfcode: (data) => {
		return api.request('/auth/vfcode', 'POST', data) //接口地址
	},
	Login: (data) => {
		return api.request('/auth/login', 'POST', data) //接口地址
	},
	getCourses: () => {
		return api.request('/courses','GET')
	}
}
