<template name="code-elf-logforget">
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view class="avatorWrapper">
			<view class="avator">
				<u-upload ref="uUpload" :auto-upload="false" :action="action" :file-list="fileList" mode="aspectFill"
					@tap="chooseAvatar"></u-upload>
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
					<u-input v-model="form.course" placeholder="请输入课程名称" />
				</u-form-item>

				<u-form-item :label-position="labelPosition" label="学期" prop="team" label-width="150">
					<u-input :border="border" type="select" :select-open="selectShow" v-model="form.team"
						placeholder="请选择学期" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="学校院系" prop="school" label-width="150">
					<u-input :border="border" type="select" :select-open="pickerShow" v-model="form.school"
						placeholder="请选择学校院系" @click="Show"></u-input>
				</u-form-item>
			</u-form>
			<view>
				<u-button type="default" :ripple="true" shape="circle" class="loginBtn" @click="submit">创建</u-button>
				<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm">
				</u-select>
				<u-select mode="mutil-column-auto" :list="SchoolList" v-model="pickerShow" @confirm="selectconfirm"
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
				fileList: [{
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}],
				form: {
					class: '',
					course: '',
					team: '',
					school: '',
				},
				errorType: ['message', 'border-bottom'],
				show: false,
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
					'CollegePointId': '',
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
				selectList: [{
						value: '2020-2021上学期',
						label: '2020-2021上学期'
					},
					{
						value: '2020-2021下学期',
						label: '2020-2021下学期'
					},
					{
						value: '2021-2022上学期',
						label: '2021-2022上学期'
					},
					{
						value: '2021-2022下学期',
						label: '2021-2022下学期'
					},
					{
						value: '2022-2023上学期',
						label: '2022-2023上学期'
					},
					{
						value: '2022-2023下学期',
						label: '2022-2023下学期'
					}
				],
				SchoolList: [{
					value: null,
					label: null,
					children: [{
						value: null,
						label: null,
						children: [{}]
					}]
				}]
			};
		},
		computed: {
			status() {
				return this.show == true ? 0 : 1;
			}
		},
		onLoad() {
			this.$Api.getCollege().then(res => {
								// console.log(res)
								if (res.data.success) {
									console.log(res.data.success)
									let server = res.data.data;
									// let values = server.typeList
									for (var i = 0; i < server.length; i++) {
										var obj = {
											label: server[i].collegePoint.collegePointName,
											value: server[i].collegePoint.collegePointId,
										};
										this.SchoolList.push(obj);
									}
									for (var i = 0; i < server.length; i++) {
										for (var j = 0; k < server[i].collegePoints.length; k++) {
											var obj = {
												label: server[i].collegePoints[j].collegePointName,
												value: server[i].collegePoints[j].collegePointId,
											};
											this.SchoolList.children.push(obj)
										}
									}
									for (var i = 0; i < server.length; i++) {
										for (var j = 0; j < server[i].collegePoints.length; j++) {
											var obj = {
												label: server[i].collegePoints[j].collegePointName,
												value: server[i].collegePoints[j].collegePointId,
											};
											this.SchoolList.children.push(obj)
										}
									}
									for (var i = 0; i < server.length; i++) {
										for (var j = 0; j < server[i].collegePoints.length; j++) {
											for (var k = 0; k < server[i].collegePoints[j].length; k++) {
												var obj = {
													label: server[i].collegePoints[j].collegePoints[k].collegePointName,
													value: server[i].collegePoints[j].collegePoints[k].collegePointId,
												};
												this.SchoolList.children.children.push(obj)
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
		},
		methods: {
			// 选择地区回调
			regionConfirm(e) {
				this.form.school = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			statusChange(index) {
				this.show = index == 0 ? true : false;
			},
			modeChange(index) {
				this.mode = ['selector', 'multiSelector', 'time', 'region'][index];
				if (this.mode == 'selector') {
					this.range = ['一', '片', '冰', '心', '在', '玉', '壶'];
					this.defaultSelector = [0];
				}
				if (this.mode == 'multiSelector') {
					this.range = [
						['亚洲', '欧洲'],
						['中国', '日本'],
						['北京', '上海', '广州']
					];
					this.defaultSelector = [0, 0, 0];
				}
				this.show = true;
			},
			defaultTimeChange(index) {
				this.defaultTime = index == 0 ? '2019-12-11 20:15:35' : '2020-02-05 13:09:42';
				this.mode = 'time';
				this.show = true;
			},
			defaultRegionChange(index) {
				this.defaultRegion = index == 0 ? ['广东省', '深圳市', '宝安区'] : ['海南省', '三亚市', '海棠区'];
				this.mode = 'region';
				this.show = true;
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
			click() {
				this.show = true;
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
				this.data.course = this.form.classname;
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
									uni.navigateTo({
										url: "/pages/class/success-create"
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
			selectconfirm(e) {
				this.form.school = '';
				e.map((val, index) => {
					this.form.school += this.form.school == '' ? val.label : '-' + val.label;
				})
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
		width: 100%
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
