<template name="code-elf-logforget">
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<u-upload ref="uUpload" :auto-upload="false" :action="action" :file-list="fileList" mode="aspectFill"
					@tap="chooseAvatar"></u-upload>
			</view>
		</view>
		<view class="form">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item left-icon="phone" prop="phone">
					<u-input v-model="form.phone" placeholder="手机号码" />
				</u-form-item>
				<u-form-item left-icon="lock" prop="validadation">
					<u-input v-model="form.validadation" placeholder="验证码" />
					<u-toast ref="uToast"></u-toast>
					<!-- <text :v-show="istrue">验证码输入错误</text> -->
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange">
					</u-verification-code>
					<u-button type="default" :ripple="true" size="mini" shape="circle" class="wrap" @tap="getCode">
						{{tips}}
					</u-button>
				</u-form-item>
				<u-form-item left-icon="lock" prop="password">
					<u-input type="password" v-model="form.password" placeholder="请输入密码" />
				</u-form-item>
				<u-form-item left-icon="lock" prop="repassword">
					<u-input type="password" v-model="form.repassword" placeholder="请再次输入密码" />
				</u-form-item>
			</u-form>
			<view class="forgotBtn">
				<text>忘记密码</text>
			</view>
			<!-- <view class="loginBtn">
				<text class="btnValue">登录</text>
			</view> -->
			<view>
				<u-button type="success" :ripple="true" shape="circle" :custom-style="customStyle" @click="submit">注册
				</u-button>
			</view>
			<!-- 加一个用户选择吧？ -->
			<view class="registerBtn">
				<text @click="ToReGister">已有账号？直接登录</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import md5 from '../../js_sdk/md5.js'
	export default {

		data() {
			return {
				customStyle: {
					marginTop: '30px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: 'white',
					justifyContent: 'center',
					alignItems: 'center',
				},
				// //图片上传
				action: '', //服务器
				fileList: [],
				istrue: false,
				//验证码：
				tips: '获取',
				/// refCode: null,
				seconds: 60,
				isget: false,
				///文字提示
				errorType: ['message', 'border-bottom'],
				form: {
					phone: '',
					validadation: '',
					password: '',
					repassword: '',
				},
				rules: {
					phone: [{
							required: true,
							message: "手机号码不可为空",
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
						// },{
						// 	// 自定义验证函数，见上说明
						// 	validator: (rule, value, callback) => {
						// 		// this.$Api.getAllUser().then(res=>{
						// 		// 	if(res.success){
						// 		// 		for(let i = 0;i < res.data.length();i++)
						// 		// 		{
						// 		// 			if(value === res.data[i].phone)
						// 		// 				return true;
						// 		// 		}
						// 		// 	}
						// 		// })
						// 	},
						// 	message: '已注册，请直接登陆',
						// 	// 触发器可以同时用blur和change
						// 	trigger: ['change', 'blur'],
						// }
						// // 校验用户是否已存在
						// 		{
						// 			asyncValidator: (rule, value, callback) => {
						// 				this.$u.post('/xxx/xxx', {name: value}).then(res => {
						// 					// 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
						// 					if(res.error) {
						// 						callback(new Error('姓名重复'));
						// 					} else {
						// 						// 如果校验通过，也要执行callback()回调
						// 						callback();
						// 					}
						// 				})
						// 			},
						// 			// 如果是异步校验，无需写message属性，错误的信息通过Error抛出即可
						// 			// message: 'xxx'
						// 		}
					],
					validadation: [{
						required: true,
						message: "验证码不可为空",
						trigger: ['change', 'blur'],
					}, ],
					password: [{
							required: true,
							message: "密码不可为空",
							trigger: ['change', 'blur'],
						},
						{


							// validator: (rule, value, callback) => {
							// 	// 上面有说，返回true表示校验通过，返回false表示不通过
							// 	return this.$u.test.rangeLength(value, [8, 10]);
							// },
							pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符',
							// 触发器可以同时用blur和change
							trigger: 'blur',
						},
					],
					repassword: [{
							required: true,
							message: "密码不可为空",
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								const isTheSome = false;
								// console.log(value);
								//	console.log(this.form.password);
								if (this.form.password === value) {
									return true;
								}

								return isTheSome;
							},
							message: '两次密码输入不同',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						},
					],
				}
			}
		},
		methods: {
			//验证码
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				this.isget = true;
				console.log("判断是否输入手机号码，若无则提示。")
				console.log("判断手机号是否已注册过，若是则提醒返回登录界面，不再注册");

				if (this.form.phone === '') {
					// this.$refs.uCode.canGetCode = false;
					this.$u.toast('请输入手机号码');
				} else if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$Api.valicode(this.form.phone).then(res => {
							if (res) {

							}
						}, err => {
							console.log(err);
						})
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('请稍等。。');
				}
				console.log(this.$refs.uCode.canGetCode);
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('倒计时开始');
			},

			ToReGister: function() {
				uni.redirectTo({
					url: '/pages/login/login'
				});
			},
			submit: function() {
				if (!this.isget) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: "请发送验证码",
						success(res) {
							if (res.confirm) {
								// console.log('用户点击确定')
								uni.navigateBack({})
							} else if (res.cancel) {
								// console.log('用户点击取消')
							}
						}
					})
				} else {
					console.log(this.form.phone);
					let md5pwd = md5(this.form.password)
					console.log(md5pwd);
					let data = {
						phone: this.form.phone,
						password: md5pwd,
					};
					let vfdata = {
						phone: this.form.phone,
						code: this.form.validadation,
					}
					console.log(vfdata);
					this.$refs.uForm.validate(valid => {
						console.log(vfdata);
						console.log(valid);
						// console.log(Qs.stringify(data));
						if (valid) {
							this.$Api.vfcode(vfdata).then(res => {
								if (!res.data.success) {
									this.istrue = true;
									console.log(res);
									console.log('验证码错误');
								} else {
									// this.$refs.uUpload.upload();
									console.log('验证通过，将用户信息插入数据库');


									this.$Api.addUser(data).then(res => {
										if (res.data.success) {
											uni.switchTab({
												url: '../index/class',
											});
										} else {
											console.log('验证失败');
										}
									});
								}
							});
						} else {
							console.log("接口错误");
						}
					});
				}

			},
			// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
			onReady() {
				this.$refs.uForm.setRules(this.rules);
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
		margin-top: 30px;
		text-align: center;
	}

	.forgotBtn {
		text-align: right;
		color: #000000;
		font-size: 10px;
		margin-top: 15px;
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
		background: #ffffff;
		border-radius: 50upx;
		margin-top: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-style: ridge;
		border-color: #000000;

	}
</style>
