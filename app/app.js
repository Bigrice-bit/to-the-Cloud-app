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
	rvalicode: (data) => {
		let str = '/auth/logincode?phone=' + data;
		return api.request(str, 'POST', data) //接口地址
	},
	vfcode: (data) => {
		return api.request('/auth/vfcode', 'POST', data) //接口地址
	},
	login: (data) => {
		return api.request('/auth/login', 'POST', data) //接口地址
	},
	getCourses: () => {
		return api.request('/courses','GET')
	},
	addCourses: (data) => {
		return api.request('/courses','POST',data)
	},
	signIn: (data) => {
		return api.request('/signs','POST',data)
	},
	// 获取学校等
	getCollege: () => {
		return api.request('/colleges','GET')
	},
	// 通过课程Id查找课程
	SelectCourseById: (data) => {
		let str = '/classcourses/classcoursenum/' + data;
		console.log(str)
		return api.request('str','GET')
	}
	
}
