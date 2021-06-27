<template name="code-elf-logforget">
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view class="avatorWrapper">
			<view class="avator">
				<!-- <u-upload ref="uUpload" :auto-upload="false" :action="action" :file-list="fileList" mode="aspectFill"
					@tap="chooseAvatar"></u-upload> -->
					<image class="img" src="../../static/Class.png" mode=""></image>
			</view>
		</view>
		<!-- 		<view class="content">
		<view class="wrap">
				<view class="u-avatar-wrap">
					<image class="u-avatar-demo" :src="avatar" mode="aspectFill" @tap="chooseAvatar"></image>
				</view>
				
			</view> -->
		<view class="form">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item :label-position="labelPosition" label="班级" prop="team" label-width="150">
					<u-input v-model="form.class" placeholder="请输入班级名称" />
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="课程" prop="team" label-width="150">
					<u-input :border="border"  v-model="form.course" placeholder="请输入课程名称"  />
					<u-input :border="border" type="select"  placeholder="" @click="ClassShow = true" />
				</u-form-item>
			<!-- 	<u-form-item :label-position="labelPosition" label="课程" prop="team" label-width="150">
					<u-input  v-model="form.course" placeholder="请输入课程名称" @click="ClassShow = true" />
				</u-form-item> -->

				<u-form-item :label-position="labelPosition" label="学期" prop="team" label-width="150">
					<u-input :border="border" type="select" :select-open="selectShow" v-model="form.term"
						placeholder="请选择学期" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="学校院系" prop="school" label-width="150">
					<u-input :border="border" type="select" :select-open="pickerShow" v-model="form.school"
						placeholder="请选择学校院系" @click="Show"></u-input>
				</u-form-item>
			</u-form>
			<view>
				<u-button type="default" :ripple="true" shape="circle" class="loginBtn" @click="submit">创建</u-button>
				<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectTerm" @default-value="selectList[0]">
				</u-select>
				<u-select mode="single-column" :list="CourseList" v-model="ClassShow" @confirm="selectClass" @cancel="cancel">
				</u-select>
				<u-select mode="mutil-column-auto" :list="SchoolList" v-model="pickerShow" @confirm="selectSchool"
					@cancel="cancel">
				</u-select>

			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				title: "创建班课",
				isFixed: true,
				isBack: true,
				backText: '返回',
				backIconName: 'nav-back',
				action: '', //服务器
				labelPosition: 'left',
				border: false,
				selectShow: false,
				pickerShow: false,
				ClassShow: false,
				fileList: [{
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}],
				form: {
					class: '',
					course: '',
					term: '',
					school: '',
				},
				errorType: ['message', 'border-bottom'],
				input: '',
				rangKey: 'name',
				mode: 'selector',
				range: ['一', '片', '冰', '心', '在', '玉', '壶'],
				defaultTime: '2019-12-11 20:15:35',
				defaultSelector: [0],
				defaultRegion: ['广东省', '深圳市', '宝安区'],
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				data: {
					'creator': '',
					'courseName': '',
					'ClassCourseName': '',
					'Term': '',
					'CollegePointId': null,
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true,
					province: true,
					city: true,
					area: true,
					timestamp: true
				},
				selectList: [
					{
						value: null,
						label: null,
					}
				],
				CourseList:[
					{
						value: null,
						label: null,
						id: null,
					}
				],
				SchoolList: [{
					value: null,
					label: '请选择学校',
					children: [{
						value: null,
						label: '请选择学院',
						children: [{
							value: null,
							label: '请选择专业',
						}]
					}]
				}],
				timestamp:null,
				year:null,
			};
		},
		computed: {
			status() {
				return this.show == true ? 0 : 1;
			}
		},
		onLoad() {
			// this.form.term = this.selectList[1].value
			this.$Api.getCollege().then(res => {
				console.log(res)
				if (res.data.success) {
					// console.log(res.data.success)
					let server = res.data.data;
					// for (var i = 0; i < server.length; i++) {
					// 	var obj1 = {
					// 		label: server[i].collegePoint.collegePointName,
					// 		value: server[i].collegePoint.collegePointId,
					// 	};
					// 	this.SchoolList.push(obj1);
					// 	for (var j = 0; j < server[i].collegePoints.length; j++) {
					// 		var obj2 = {
					// 			label: server[i].collegePoints[j].collegePoint.collegePointName,
					// 			value: server[i].collegePoints[j].collegePoint.collegePointId,
					// 		};
					// 		this.SchoolList[i].children.push(obj2)
					// 		for (var k = 0; k < server[i].collegePoints[j].collegePoints.length; k++) {
					// 			var obj3 = {
					// 				label: server[i].collegePoints[j].collegePoints[k].collegePoint.collegePointName,
					// 				value: server[i].collegePoints[j].collegePoints[k].collegePoint.collegePointId,
					// 			};
					// 			// console.log(obj3);
					// 			this.SchoolList[i].children[j].children.push(obj3)
					// 		}
					// 	}

					// }
					for (var i = 0; i < server.length; i++) {
						var obj1 = {
							label: server[i].collegePoint.collegePointName,
							value: server[i].collegePoint.collegePointId,
							children: []
						};
						this.SchoolList.push(obj1);
						}
					for (var i = 0; i < server.length; i++) {
						// console.log(server[i].collegePoints.length)
						for (var j = 0; j < server[i].collegePoints.length; j++) {
							var obj = {
								label: server[i].collegePoints[j].collegePoint.collegePointName,
								value: server[i].collegePoints[j].collegePoint.collegePointId,
								children: []
							};
							// console.log(obj);
							this.SchoolList[i+1].children.push(obj)
						}
						// console.log('2')
						// console.log(this.SchoolList[i].children)
					}
					console.log(server.length)
					for (var i = 0;i < server.length; i++) {
						console.log(server[i].collegePoints.length)
						for (var j = 0; j < server[i].collegePoints.length; j++) {
							// console.log(server[i].collegePoints[j].length)
							for (var k = 0; k < server[i].collegePoints[j].collegePoints.length; k++) {
								var obj = {
									label: server[i].collegePoints[j].collegePoints[k].collegePoint
										.collegePointName,
									value: server[i].collegePoints[j].collegePoints[k].collegePoint
										.collegePointId,
								};
								// console.log(obj);
								this.SchoolList[i+1].children[j].children.push(obj)
							
							}
						}
					}
				} else {
					uni.showToast({
						icon: "none",
						title: '暂无数据'
					})
				}
			})
			this.$Api.GetAllCourse().then(res => {
				if(res.data.success){
					console.log(res)
					for(var i = 0;i < res.data.data.length; i++)
					{
					var obj = {
						value: res.data.data[i].courseName,
						label: res.data.data[i].courseName,
						id: res.data.data[i].courseId
					}
						this.CourseList.push(obj)
					}
					console.log(this.CourseList)
				}
			})
			// let T = parseInt(this.time)
			this.timestamp = Math.round(new Date() / 1000);
			this.year = this.$u.timeFormat(this.timestamp, 'yyyy');
			console.log(this.year)
			let T = parseInt(this.year)
			var y = T - 1;
			var t = T + 1;
			for(var i = 1;i<3;i++){
			var obj ={
				value: y + '-' + this.year + '-' + i,
				label: y + '-' + this.year + '-' + i
			}
			console.log(obj)
			this.selectList.push(obj)
			}
			for(var i = 1;i<3;i++){
				
			var obj ={
				value: this.year  + '-' + t + '-' + i,
				label: this.year + '-' + t + '-' + i
			}
			console.log(obj)
			this.selectList.push(obj)
			}
			
			
	},
	methods: {
		// 选择地区回调
		regionConfirm(e) {
			this.form.school = e.province.label + '-' + e.city.label + '-' + e.area.label;
		},
		statusChange(index) {
			this.show = index == 0 ? true : false;
		},
		
		
		minSecChange(index) {
			if (index == 0) {
				this.params.hour = true;
				this.params.minute = true;
				this.params.second = true;
			}
			if (index == 1) {
				this.params.hour = false;
				this.params.minute = false;
				this.params.second = false;
			}
			this.mode = 'time';
			this.show = true;
		},
		cancel(e) {
			console.log(e);
		},
		
		submit() {
			// uni.getStorage({
			// 	key: "LoginKey",
			// 	success(e) {
			// 		e.data //这就是你想要取的token
			// 		console.log(e.data);
			// 	}
			// });
			// let LoginKey = uni.getStorage('LoginKey');
			try {
				const value = uni.getStorageSync("LoginKey");
				if (value) {
					console.log(value);
					this.data.creator = value;

				}
			} catch (e) {
				console.log(e);
			}
			console.log(this.data.creator);
			this.data.ClassCourseName = this.form.class;
			this.data.courseName = this.form.course;
			this.data.Term = this.form.term;
			// this.data.creator = 47;
			console.log(this.data);
			this.$Api.AddClass(this.data).then(res => {
				if (res.data.success) {
					let kins = res.data.data.courseId;
					uni.setStorage({
						key: this.data.courseName,
						data: kins,
						success: function() {
							setTimeout(function() {
								uni.showToast({
								title: '创建成功',
								duration: 1000
								});
								uni.navigateTo({
									url: '/pages/class/success-create?item=' + encodeURIComponent(JSON.stringify(res))
								})
							}, 1000);
							// uni.switchTab({
							// 	url: '/pages/index/class'
							// });
						}
					})

				}
			})
		},
		selectTerm(e) {
				this.form.term = '';
				e.map((val, index) => {
					this.form.term += this.form.term == '' ? val.label : '-' + val.label;
				})
		},
		selectClass(e){
			this.form.course = '';
			e.map((val, index) => {
				this.form.course += this.form.course == '' ? val.label : '-' + val.label;
			})
		},
		selectSchool(e) {
			this.form.school = '';
			e.map((val, index) => {
				this.form.school += this.form.school == '' ? val.label : '-' + val.label;
				if(val.value != null){
					this.data.CollegePointId = val.value;
					}
				console.log('val.value:');
			})
			console.log(this.data.CollegePointId);
		},
		Show() {
			this.pickerShow = true;
			console.log(this.SchoolList)
			// 			this.$Api.getCollege().then(res => {
			// 					// console.log(res)
			// 					if (res.data.success) {
			// 						console.log(res.data.success)
			// 						let server = res.data;
			// 						// let values = server.typeList
			// 						for (var i = 0; i < server.length; i++) {
			// 							var obj = {
			// 								label: server[i].collegePoint.collegePointName,
			// 								value: server[i].collegePoints.collegePointId,
			// 							};
			// 							this.SchoolList.push(obj);
			// 						}
			// 						for (var i = 0; i < server.length; i++) {
			// 							for (var j = 0; k < server[i].collegePoints.length; k++) {
			// 								var obj = {
			// 									label: server[i].collegePoints[j].collegePointName,
			// 									value: server[i].collegePoints[j].collegePointId,
			// 								};
			// 								this.SchoolList.children.push(obj)
			// 							}
			// 						}
			// 						for (var i = 0; i < server.length; i++) {
			// 							for (var j = 0; j < server[i].collegePoints.length; j++) {
			// 								var obj = {
			// 									label: server[i].collegePoints[j].collegePointName,
			// 									value: server[i].collegePoints[j].collegePointId,
			// 								};
			// 								this.SchoolList.children.push(obj)
			// 							}
			// 						}
			// 						for (var i = 0; i < server.length; i++) {
			// 							for (var j = 0; j < server[i].collegePoints.length; j++) {
			// 								for (var k = 0; k < server[i].collegePoints[j].length; k++) {
			// 									var obj = {
			// 										label: server[i].collegePoints[j].collegePoints[k].collegePointName,
			// 										value: server[i].collegePoints[j].collegePoints[k].collegePointId,
			// 									};
			// 									this.SchoolList.children.children.push(obj)
			// 								}
			// 							}
			// 						}
			// 				} else {
			// 					uni.showToast({
			// 						icon: "none",
			// 						title: '暂无数据'
			// 					})
			// 				}
			// 		})
		}
	}

	};
</script>

<style>
	.content {
		background: #ffffff;
		width: 100vw;
		height: 100vh;
	}

	.wrap {
		background-color: #ffffff;
		padding: 5rpx;
	}

	.u-avatar-wrap {
		margin-top: 80rpx;
		overflow: hidden;
		margin-bottom: 80rpx;
		text-align: center;
	}

	.u-avatar-demo {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100rpx;
	}

	.avatorWrapper {
		height: 25vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.avator {
		width: 200upx;
		height: 200upx;
		overflow: hidden;
		border-radius: 20rpx;
	}

	.avator .img {
		width: 100%;
		 height: 100%;
	}

	.form {
		padding: 0 100upx;
		margin-top: 40px;
	}

	.inputWrapper {
		width: 100%;
		height: 80upx;
		/* background: #c8c8c8; */
		/* background: white; */
		/* border-radius: 20px; */
		/* box-sizing: border-box; */
		padding: 0 20px;
		margin-top: 25px;
	}

	.inputWrapper .input {
		border-bottom: 1px solid #dbdbdb;
		border-top: 0px;
		border-left: 0px;
		border-right: 0px;
		width: 100%;
		height: 100%;
		text-align: left;
		font-size: 15px;
	}

	.loginBtn {
		margin-top: 25px;
		justify-content: center;
		align-items: center;
	}

	.logintip {
		margin-top: 50px;
		text-align: center;
	}

	.forgotBtn {
		text-align: right;
		color: #000000;
		font-size: 10px;
		margin-top: 25px;
	}

	.registerBtn {
		text-align: center;
		color: #000000;
		font-size: 13px;
		margin-top: 25px;
	}

	.iconfont {
		font-family: "iconfont";
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
		padding-left: 20px
	}

	.loginBtn {
		width: 100%;
		height: 85upx;
		background: #aaffff;
		border-radius: 50upx;
		margin-top: 25px;
		display: flex;
		justify-content: center;
		align-items: center;

	}
</style>
