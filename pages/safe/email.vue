<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view class="emailtext"><text >请输入要关联的邮箱：</text></view>
		<view class="input">
			<u-field v-model="email" label="邮箱账号" placeholder="请填写邮箱账号">
			</u-field>
		</view>
		<button type="error" class="button" @click="link">关联</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '关联邮箱',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				email: '',
			}
		},
		methods: {
			onKeyInput: function(event) {
				this.inputValue = event.target.value
			},
			link() {
				let item = uni.getStorageSync('LoginKey')
				// this.$Api.UserInfo(item).then(res => {
				// 	if(res.data.success){
				// 		res.data.data.email = this.email;
				// 		this.$Api.UpdateInfo(res.data.data).then(res => {
				// 			if(res.data.success){
				// 				uni.showToast({
				// 					title:"关联成功",
				// 					duration: 1000
				// 				})
				// 				setTimeout(function () {

				// 				  uni.reLaunch({
				// 				  	url: '/pages/safe/index'
				// 				  })

				// 				                   }, 1000);
				// 			}
				// 		})
				// 	}
				// })
				if(this.email == '')
				{
					uni.showToast({
						title:"请输入邮箱号",
						icon:'none',
						duration:1000
					})
				}
				else if(!this.$u.test.email(this.email))
				{	uni.showToast({
						title:"请输入正确的邮箱号",
						icon:'none',
						duration:1000
					})
				}
				else{
				let data = {
					userId: item,
					NewItem: this.email,
				}
				this.$Api.Email(data).then(res => {
					if (res.data.success) {
						uni.showToast({
							title: "关联成功",
							duration: 1000
						})
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/safe/index'
							})
						}, 1000);
					}

				})
			}
			}
		},
		}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
		font-size: 30upx;
	}

	.uni-input {
		background-color: #FFFFFF;
		height: 20rpx;
		font-weight: 20rpx;
	}

	.button {
		// margin-top: 100rpx;
		// bottom: var(--window-bottom);
		// position: fixed;  
		bottom: -80rpx;
		// height: 0rpx;
		width: 500rpx;
		background-color: #1abc9c;
	}
	
	.emailtext{
		// width: 1000rpx;
		margin-top: 20rpx;
		height: 60rpx;
		font-size: 40rpx;
		background-color: #f8f8f8;
	}
	
	.input{
		background-color: #FFFFFF;
	}
</style>
