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
					<u-input v-model="form.classname" placeholder="请输入课程名称" />
				</u-form-item>

				<u-form-item :label-position="labelPosition" label="学期" prop="team" label-width="150">
					<u-input :border="border" type="select" :select-open="selectShow" v-model="form.team"
						placeholder="请选择学期" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="学校院系" prop="school" label-width="150">
					<u-input :border="border" type="select" :select-open="pickerShow" v-model="form.school"
						placeholder="请选择学校院系" @click="pickerShow = true"></u-input>
				</u-form-item>
			</u-form>
			<view>
				<u-button type="default" :ripple="true" shape="circle" class="loginBtn" @click="submit">创建</u-button>
				<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm">
				</u-select>
				<u-select mode="mutil-column" :list="SchoolList" v-model="pickerShow" @confirm="selectconfirm">
				</u-select>

			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		name: "code-elf-logforget",
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
					classname: '',
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
					'courseName': '',
					'creator': '',
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
					}
				],
				SchoolList: [
					[{
							value: '1',
							label: '福州大学'
						},
						{
							value: '2',
							label: '福建师范大学'
						}
					],
					[{
							value: '1',
							label: '数学与计算机科学学院'
						},
						{
							value: '2',
							label: '经济与管理学院'
						},
						{
							value: '3',
							label: '电气与自动化学院'
						},
						{
							value: '4',
							label: '化学学院'
						},
					]
				],
			};
		},
		computed: {
			status() {
				return this.show == true ? 0 : 1;
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
			confirm(e) {
				// console.log(e);
				this.input = '';
				if (this.mode == 'time') {
					if (this.params.year) this.input += e.year;
					if (this.params.month) this.input += '-' + e.month;
					if (this.params.day) this.input += '-' + e.day;
					if (this.params.hour) this.input += ' ' + e.hour;
					if (this.params.minute) this.input += ':' + e.minute;
					if (this.params.second) this.input += ':' + e.second;
				} else if (this.mode == 'region') {
					this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
				} else if (this.mode == 'selector') {
					this.input = this.range[e[0]];
				} else if (this.mode == 'multiSelector') {
					this.input = this.range[0][e[0]] + '-' + this.range[1][e[1]] + '-' + this.range[2][e[2]];
				}
			},
			columnchange(e) {
				let column = e.column,
					index = e.index;
				this.defaultSelector[column] = index;
				switch (column) {
					case 0:
						switch (index) {
							case 0:
								this.range[1] = ['中国', '日本']
								this.range[2] = ['北京', '上海', '广州']
								break
							case 1:
								this.range[1] = ['英国', '法国']
								this.range[2] = ['伦敦', '曼彻斯特']
								break
						}
						this.defaultSelector.splice(1, 1, 0)
						this.defaultSelector.splice(2, 1, 0)
						break
					case 1: //拖动第2列
						switch (this.defaultSelector[0]) { //判断第一列是什么
							case 0:
								switch (this.defaultSelector[1]) {
									case 0:
										this.range[2] = ['北京', '上海', '广州']
										break
									case 1:
										this.range[2] = ['东京', '北海道']
										break
								}
								break
							case 1:
								switch (this.defaultSelector[1]) {
									case 0:
										this.range[2] = ['伦敦', '曼彻斯特']
										break
									case 1:
										this.range[2] = ['巴黎', '马赛']
										break
								}
								break
						}
						this.defaultSelector.splice(2, 1, 0)
						break
				}
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
				    if(value) {
				        console.log(value);
						this.data.creator = value;
				    }
				} catch(e){
				    console.log(e);
				}
				console.log(this.data.creator);
				this.data.courseName = this.form.classname;
				// this.data.creator = 47;
				console.log(this.data);
				this.$Api.addCourses(this.data).then(res => {
					if (res.data.success) {
						uni.navigateTo({
							url: "/pages/class/success-create"
						})
					}
				})
				uni.navigateTo({
					url: "/pages/class/success-create"
				})
			},
			selectConfirm(e) {
				this.form.team = '';
				e.map((val, index) => {
					this.form.team += this.form.team == '' ? val.label : '-' + val.label;
				})
			},
			selectconfirm(e) {
				this.form.school = '';
				e.map((val, index) => {
					this.form.school += this.form.school == '' ? val.label : '-' + val.label;
				})
			},
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
