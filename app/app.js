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
	// 通过班课号查找班课
	SelectCourseById: (data) => {
		let str = '/classcourses/classcoursenum/' + data;
		return api.request(str,'GET')
	},
	//添加班课
	AddClass: (data) => {
		return api.request('/classcourses','POST',data)
	},
	//加入班课
	joinClass: (data) => {
		return api.request('/stuclasscourses','POST',data)
	},
	// 根据Creator获取老师创建的所有班课
	GetAllCreatedClass: (data) => {
		let url = '/classcourses/creator/' + data
		return api.request(url,'GET')
	},
	// 根据stuid获取加入的所有班课
	GetAllJoinedClass: (data) => {
		let url = '/stuclasscourses/' + data
		return api.request(url,'GET')
	},
	//根据班课Id返回加入该班课的所有学生及总数
	GetAllStu: (data) => {
		let url = '/classcoursestudents/' + data
		return api.request(url,'GET')
	}, 
	// 获取学生对应课程的经验值（查）
	GetExper: (data)  => {
		return api.request('/info','GET',data)
	},
	// 删除班课
	DeleteClass: (data) => {
		let url = '/classcourses/' + data
		return api.request(url,'DELETE')
	},
	//获取个人信息
	UserInfo: (data) => {
		let url = '/users/' + data
		return api.request(url,'GET')
	},
	//更新个人信息
	UpdateInfo: (data) =>{
		return api.request('/users','PUT',data)
	},
	//教师创建签到
	CreateSign: (data) =>{
		return api.request('/signs',"POST",data)
	}
	
}
