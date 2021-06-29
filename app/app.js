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
	//修改密码
	ChangPwd: (data) => {
		return api.request('/auth/changepassword','POST',data)
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
		return api.request('/info','POST',data)
	},
	// 删除班课
	DeleteClass: (data) => {
		let url = '/classcourses/' + data
		return api.request(url,'DELETE')
	},
	//更新班课（改）
	UpdateClass: (data) => {
		return api.request('/classcourses','PUT',data)
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
	},
	//更新老师创建的签到  比如放弃或结束
	UpdateSignIn:(data) => {
		return api.request('/signs','PUT',data)
	},
	//通过StartSignId获取创建学生签到的信息（查）
	SignInfo: (data) => {
		let url = '/sign/' + data
		return api.request(url,'GET')
	},
	//学生签到
	StuSign: (data) => {
		// console.log("111")
		// console.log(data)
		
		return api.request('/signrecords','POST',data)
	},
	//判断是否有老师创建的该班课的签到
	IsSignIn: (data) => {
		let url = '/startsign/' + data
		return api.request(url,'GET')
	},
	//通过课程Id查找课程（查）
	SearchCourse:(data) => {
		let url = '/courses/' + data
		return api.request(url,'GET')
	},
	//通过班课Id查找班课（查）
	SearchClass:(data) => {
		let url = '/classcourses/' + data
		return api.request(url,'GET')
	},
	//获取所有课程
	GetAllCourse: (data) => {
		return api.request("/courses",'GET')
	},
	//老师发起某一班课classcourseid的签到记录
	TeaRecord: (data,index) => {
		let url = '/startsign/' + data + '/' + index
		return api.request(url,'GET')
	},
	//学生在某一班课classcourseid的签到记录
	StuRecord: (data,index) => {
		let url = '/stusigninfo/' + data + '/' + index
		return api.request(url,'GET')
	},
	//学生退出班课
	ExitClass: (data) =>{
		return api.request('/stuclasscourses','DELETE',data)
	},
	// 通过StartSignId删除创建的签到（删）
	DeleteSign:(data) => {
		let url='/signs/'+data
		return api.request(url,'DELETE')
	},
	//更新学生签到状态（改）
	UpdateStuStatus: (data) => {
		return api.request('/signrecords','PUT',data)
	},
	//用户退出登录
	Exit:(data) => {
		let url = '/auth/logout/'+data
		return api.request(url,'DELETE')
	},
	//关联邮箱
	Email: (data) => {
		return api.request('/emailchange','POST',data)
	},
	//验证密码
	VerPwd:(data) => {
		return api.request('/passwordverify','POST',data)
	},
	//修改密码
	ChangePwd: (data) => {
		return api.request('/auth/changepassword','POST',data)
	},
	//获取总经验值
	AllExpr:(data) => {
		let url = '/info/'+data
		return api.request(url,'GET')
	},
	//根据 collegeid获取学校
	GetCollegeById:(data) =>{
		let url = '/targetcolleges/' + data
		return api.request(url,'GET');
	}
	
}
