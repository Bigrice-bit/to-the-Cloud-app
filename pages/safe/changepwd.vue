<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view class="form">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item left-icon="lock" prop="oldpassword">
					<u-input v-model="form.oldpassword" type="password" placeholder="请输入旧密码" />
				</u-form-item>
				<u-form-item left-icon="lock" prop="newpassword">
					<u-input v-model="form.newpassword" type="password" placeholder="请输入新密码" />
				</u-form-item>
			</u-form>
			<view>
				<u-button type="success" :ripple="true" shape="circle" :custom-style="customStyle" @click="link">确认修改
				</u-button>

			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../js_sdk/md5.js'
	var _this
	export default {
		data() {
			return {
				title: '修改密码',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				form: {
					oldpassword: '',
					newpassword: '',
				},
				customStyle: {
					marginTop: '30px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: 'white',
					justifyContent: 'center',
					alignItems: 'center',
				},
				phone: '',
				//文字提示
				errorType: ['message', 'border-bottom'],
				pwd: {},
				rules: {
					oldpassword: [{
						required: true,
						message: "密码不可为空",
						trigger: ['blur', 'change'],
					}, ],
					newpassword: [{
						required: true,
						message: "密码不可为空",
						trigger: ['blur', 'change'],
					}, ],

				}

			}
		},
		onLoad(option) {
			this.phone = option.item
			console.log(this.phone)
		},
		created() {
			_this = this;
		},
		methods: {
			// onKeyInput: function(event) {
			//            this.inputValue = event.target.value
			//        },
			link() {
				this.$refs.uForm.validate(valid => {
					console.log(valid);

					let data = {
						phone: this.phone,
						oldPassword: md5(this.form.oldpassword),
						newPassword: md5(this.form.newpassword),
					};
					let user = uni.getStorageSync("LoginKey")
					let obj = {
						userId: user,
						password: data.oldPassword
					}
					console.log(data)
					console.log(obj)
					if (valid) {
						console.log(data);
						_this.$Api.VerPwd(obj).then(res => {
							console.log('res')
							if (res.data.success) {
								_this.$Api.ChangPwd(data).then(res => {
									console.log(res);
									if (res.data.success) {
										console.log('修改成功');
										// this.$u.vuex('vuex_jurisdiction.name','1');
										// let kins = res.data.data.user.userId;
										uni.showToast({
											title: res.data.msg,
											duration: 1000
										});
										setTimeout(function() {
											let id = uni.getStorageSync('LoginKey')
											_this.$Api.Exit(id).then(res => {
												if (res.data.success) {
													uni.removeStorageSync(
														'LoginKey');
													uni.removeStorageSync(
														'lifeData');
													uni.removeStorageSync(
														'ClassKey');
													uni.removeStorageSync('TOKEN');
													uni.navigateTo({
														url: '/pages/login/login'
													})
												}
											});

										}, 1000);
										// uni.switchTab({
										// 	url: '/pages/index/class'
										// });
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none',
											duration: 1000
										});

									}
								})
							} else {
								console.log("失败")
							}
						})




					} else {
						uni.showToast({
							title: '请输入新旧密码',
							icon: 'none',
							duration: 1000
						});

					}
				});
			}


		},
		// / /必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
		font-size: 30upx;
	}

	.content {
		display: flex;
		flex-direction: column;
		// align-items: center;
		justify-content: center;
		margin-top: 45rpx;
	}

	.uni-input {
		background-color: #FFFFFF;
		height: 20rpx;
		font-weight: 20rpx;
	}

	.form {
		padding: 0 100upx;
		margin-top: 40px;
	}
</style>
