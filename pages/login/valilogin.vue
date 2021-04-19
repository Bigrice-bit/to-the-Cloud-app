<template name="code-elf-logforget">
<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/1.png" mode="widthFix"></image>
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
				<u-form-item 
							left-icon="phone" 
							prop="phone">
				<u-input 	v-model="form.phone" 
							placeholder="手机号码"/></u-form-item>
				<u-form-item 
							left-icon="lock" 
							prop="validadation">
				<u-input 	
							v-model="form.validadation" 
							placeholder="验证码" />
				<u-toast 	ref="uToast"></u-toast>
				<u-verification-code 
							:seconds="seconds" 
							@end="end" 
							@start="start" 
							ref="uCode" 
							@change="codeChange"></u-verification-code>
				<u-button 
							type="default"
							:ripple="true" 
							size="mini"
							shape="circle" 
							class="wrap" 
							@tap="getCode">{{tips}}</u-button></u-form-item></u-form>
			<view class="forgotBtn">
				<text @click="ToReGister(1)">忘记密码</text>
			</view>
			<!-- <view class="loginBtn">
				<text class="btnValue">登录</text>
			</view> -->
			<view>
				<u-button 
							type="success" 
							:ripple="true" 
							shape="circle" 
							:custom-style="customStyle" 
							 @click="submit">登录</u-button>
			</view>
			<view class="registerBtn">
				<text @click="ToReGister(2)">创建账号</text>
			</view>
			<view class="logintip">
			<text>————————&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;————————</text>
			</view>
				<view class="loginBtn">
					<u-icon name="phone"></u-icon><text @click="ToReGister(3)">密码登录</text>
				</view>
				<view class="loginBtn">
					<u-icon name="weixin-fill"></u-icon><text>微信登录</text>
				</view>
		</view>
	</view>
	</view>
</template>

<script>
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
				fileList: [
							{
								url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
							}
						],
				// avatar: 'https://cdn.uviewui.com/uview/common/logo.png',
				//验证码：
				tips: '获取',
				// refCode: null,
				seconds: 60,
				//文字提示
				errorType: ['message', 'border-bottom'],
				form: {
					phone: '',
					validadation: '',
					password:'',
					repassword:'',
					},
				rules:{
					phone:[
						{
							required: true, 
							message:"手机号码不可为空",
							trigger: ['change','blur'],
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
							trigger: ['change','blur'],
						},
					],
					validadation:[
						{
							required: true, 
							message:"验证码不可为空",
							trigger: ['change','blur'],
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
				console.log("判断是否输入手机号码，若无则提示。")
				console.log("判断手机号是否已注册过，若是则提醒返回登录界面，不再注册");
				
				if(this.form.phone === ''){
					// this.$refs.uCode.canGetCode = false;
					this.$u.toast('请输入手机号码');
				}
				
				else if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
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
			ToReGister(i){
				if(i === 1){
					uni.redirectTo({
							url: '/pages/forgetpwd/forget_pwd'
						});
					
				}
				else if(i === 2){
					uni.redirectTo({
						url: '/pages/register/register'
					});
				}
				else{
					uni.redirectTo({
						url: '/pages/login/login'
					});
				}
			},
			submit: function(){
				console.log(this.form.phone);
				this.$refs.uForm.validate(valid => {
					console.log(valid);
								if (valid) {
									this.$refs.uUpload.upload();
									console.log('验证通过');
								} else {
									console.log('验证失败');
								}
							});
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
	.avatorWrapper{
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
	.avator .img{
		width: 100%
	}
	.form{
		padding: 0 100upx;
		margin-top: 40px;
	}
	.inputWrapper{
		width: 100%;
		height: 80upx;
		/* background: #c8c8c8; */
		/* background: white; */
		/* border-radius: 20px; */
		/* box-sizing: border-box; */
		padding: 0 20px;
		margin-top: 25px;
	}
	.inputWrapper .input{
		border-bottom: 1px solid #dbdbdb;  
		border-top:0px;  
		border-left:0px;  
		border-right:0px;  
		width: 100%;
		height: 100%;
		text-align: left;
		font-size: 15px;
	}
	.logintip{
		margin-top: 30px;
		text-align: center;
	}
	.forgotBtn{
		text-align: right;
		color: #000000;
		font-size: 10px;
		margin-top: 15px;
	}
	.registerBtn{
		text-align: center;
		color: #000000;
		font-size: 13px;
		margin-top: 20px;
	}
	.iconfont{
	        font-family:"iconfont";
	        font-size:16px;
	        font-style:normal;
	        -webkit-font-smoothing: antialiased;
	        -webkit-text-stroke-width: 0.2px;
	        -moz-osx-font-smoothing: grayscale; 
	        padding-left:20px
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
