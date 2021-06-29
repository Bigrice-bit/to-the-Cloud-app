<template name="code-elf-logforget">
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/logo.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item left-icon="phone" prop="phone">
					<u-input v-model="form.phone" placeholder="请输入手机号码" />
				</u-form-item>
				<u-form-item left-icon="lock" prop="code">
					<u-input v-model="form.code" placeholder="验证码" />
					<u-toast ref="uToast"></u-toast>
					<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange">
					</u-verification-code>
					<u-button type="default" :ripple="true" size="mini" shape="circle" class="wrap" @tap="getCode">
						{{tips}}
					</u-button>
				</u-form-item>
				<u-form-item left-icon="lock" prop="oldpassword">
					<u-input type="password" v-model="form.oldpassword" placeholder="请输入旧密码" />
				</u-form-item>
				<u-form-item left-icon="lock" prop="newpassword">
					<u-input type="password" v-model="form.newpassword" placeholder="请输入新密码" />
				</u-form-item>
			</u-form>
			<!-- <view class="loginBtn">
				<text class="btnValue">登录</text>
			</view> -->
			<view>
				<u-button type="success" :ripple="true" shape="circle" :custom-style="customStyle" @click="submit">确认更改
				</u-button>
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
				title: '忘记密码',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				tabbar: '',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				keyword: '',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				label: '此处显示学号，后台返回',
				background: {
					// backgroundColor: '#001f3f',

					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					backgroundSize: 'cover',

					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				// //图片上传
				action: '', //服务器
				fileList: [{
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}],
				// avatar: 'https://cdn.uviewui.com/uview/common/logo.png',
				//验证码：
				tips: '获取',
				// refCode: null,
				seconds: 60,
				isget: false,
				//文字提示
				errorType: ['message', 'border-bottom'],
				form: {
					phone: '',
					code: '',
					oldpassword: '',
					newpassword: '',
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
						},
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
					code: [{
						required: true,
						message: "验证码不可为空",
						trigger: ['change', 'blur'],
					}, ],
					oldpassword: [{
							required: true,
							message: "密码不可为空",
							trigger: ['change', 'blur'],
						}
					],
					newpassword: [{
							required: true,
							message: "密码不可为空",
							trigger: ['change', 'blur'],
						},
						{

							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过

								return this.$u.test.rangeLength(value, [8, 10]);
							},
							message: '密码长度应在8-10位之间',

							// 触发器可以同时用blur和change
							trigger: 'blur',
						},
					],
				}
			}
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				// 可以在此上传到服务端
				uni.uploadFile({
					url: '',
					filePath: path,
					name: 'file',
					complete: (res) => {
						console.log(res);
					}
				});
			})
		},
		methods: {
			chooseAvatar: function() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '../../uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			//验证码
			codeChange(text) {
				this.tips = text;
			},
			onClick() {
				this.$emit('click');
			},
			getCode() {
				this.isget = true;
				if (this.$refs.uCode.canGetCode) {
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
					this.$u.toast('倒计时结束后再发送');
				}
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
								// uni.navigateBack({})
							} else if (res.cancel) {
								// console.log('用户点击取消')
							}
						}
					})
				} else {
				console.log(this.form.phone);
				let md5pwd = md5(this.form.oldpassword)
				let md5pwd1 = md5(this.form.newpassword)
				console.log(md5pwd);
				let data = {
					phone: this.form.phone,
					oldpassword: md5pwd,
					newpassword: md5pwd1,
					code:this.form.code
				};
				let vfdata = {
					phone: this.form.phone,
					code: this.form.code,
				}
				this.$refs.uForm.validate(valid => {
					console.log(valid);
					if (valid) {
						this.$Api.vfcode(vfdata).then(res => {
							console.log(res);
							if (!res.data.success) {
								this.istrue = true;
								console.log(res);
								console.log('验证码错误');
							} else {
								// this.$refs.uUpload.upload();
								console.log('验证通过，将用户信息插入数据库');


								this.$Api.ChangePwd(data).then(res => {
									if (res.data.success) {
										uni.showToast({
											title:'修改成功',
										duration: 1000
										});
										setTimeout(function () {
											
										   uni.navigateTo({
										   	url: '../login/login',
										   });
													   
										                   }, 1000);
										
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
		border-radius: 100rpx;
		border-style: ridge;
		border-color: #000000;
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
		background: #ffffff;
		border-radius: 50upx;
		margin-top: 25px;
		display: flex;
		justify-content: center;
		align-items: center;

	}
</style>
