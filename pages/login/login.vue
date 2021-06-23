<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/1.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item left-icon="phone" prop="phone">
					<u-input v-model="form.phone" placeholder="请输入手机号码" />
				</u-form-item>
				<u-form-item left-icon="lock" prop="password">
					<u-input v-model="form.password" type="password" placeholder="请输入密码" />
				</u-form-item>
				<!-- <view class="inputWrapper">
				
			<input class="input" type="number" value="" placeholder="手机号码"  placeholder-class="iconfont icon-shoujihaoma" />
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" value="" adjust-position=ture placeholder="登录密码" placeholder-class="iconfont icon-mima" />
			</view> -->
			</u-form>
			<view class="forgotBtn">
				<text @click="ToReGister(1)">忘记密码</text>
			</view>
			<!-- <view class="loginBtn">
				<text class="btnValue">登录</text>
			</view> -->
			<view>
				<u-button type="success" :ripple="true" shape="circle" :custom-style="customStyle" @click="submit">登陆
				</u-button>
		
			</view>
			<view class="registerBtn">
				<text @click="ToReGister(2)">创建账号</text>
			</view>
			<view class="logintip">
				<text>————————&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;————————</text>
			</view>
			<view class="loginBtn">
				<u-icon name="phone"></u-icon><text @click="ToReGister(3)">手机验证码登录</text>
			</view>
			<view class="loginBtn">
				<u-icon name="qq-fill"></u-icon><text @click="ToReGister(4)">QQ登录</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import md5 from "../../js_sdk/md5.js"
	import Vue from 'vue'
	import Vuex from 'vuex'
	export default {
		data() {
			return {
				message: '',
				customStyle: {
					marginTop: '30px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: 'white',
					justifyContent: 'center',
					alignItems: 'center',
				},
				//文字提示
				errorType: ['message', 'border-bottom'],
				form: {
					name: '',
					intro: '',
					phone: '',
					password: '',
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
					password: [{
						required: true,
						message: "密码不可为空",
						trigger: ['change', 'blur'],
					}, ],

				}
			}
		},
		onLoad() {
			// this.$mc.vuex('jurisdiction',1);
		},
		methods: {
			ToReGister(i) {
				if (i === 1) {
					uni.redirectTo({
						url: '/pages/forgetpwd/forget_pwd'
					});

				} else if (i === 2) {
					uni.redirectTo({
						url: '/pages/register/register'
					});
				} else if (i === 3) {
					uni.redirectTo({
						url: '/pages/login/valilogin'
					});
				} else {
					console.log("第三方登录")
				}
			},
			submit: function() {
				console.log(this.form.phone);
				console.log("判断这个手机号码是否存在于数据库中，若存在，判断手机号码与密码是否对应，若对应，则登录，不对应提示密码错误");
				this.$refs.uForm.validate(valid => {
					console.log(valid);
					let data = {
						Phone: this.form.phone,
						Password: md5(this.form.password),
					};
					if (valid) {
						console.log(data);
						this.$Api.login(data).then(res => {
							console.log(res);
							if (res.data.success) {
								console.log('验证通过');
								this.$u.vuex('vuex_jurisdiction.name','1');
								let kins = res.data.data.user.userId;
								uni.setStorage({
									key:'LoginKey',
									data:kins,
									success:function(){
										setTimeout(function () {
										               uni.reLaunch({
										               	url: '/pages/index/class',
														 // // success(){
														 // //        let page = getCurrentPages().pop(); //跳转页面成功之后
														 // //        if (!page) return; 
														 // //            page.onLoad(); //如果页面存在，则重新刷新页面
														 // //        }
										               });
													   
										                   }, 1000);
										// uni.switchTab({
										// 	url: '/pages/index/class'
										// });
									}
								})

							
								
							} else {
								// uni.showModal({
								// 	title: '提示',
								// 	showCancel: false,
								// 	content: "用户名或密码错误",
								// 	success(res) {
								// 		if (res.confirm) {
								// 			// console.log('用户点击确定')
								// 			// uni.navigateBack({})
								// 		} else if (res.cancel) {
								// 			// console.log('用户点击取消')
								// 		}
								// 	}
								// })
								
							}
						});
					}
				});
			},

			// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
			onReady() {
				this.$refs.uForm.setRules(this.rules);
			},
		}
	}
</script>

<style>
	.content {
		background: #ffffff;
		width: 100vw;
		height: 100vh;
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
		margin-top: 20px;
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
