<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<text>请输入要关联的邮箱：</text><br />
		<view class="uni-form-item uni-column">
		     <u-field
		     			v-model="pwd"
						type="password"
		     			label="请填写旧密码"
		     			placeholder="请填写旧密码"
		     		>
		     		</u-field>
				<button type="error" class="button" @click="link">下一步</button>
		</view>
		<view class="uni-form-item uni-column">
		     <u-field
		     			v-model="pwd"
						type="password"
		     			label="请填写旧密码"
		     			placeholder="请填写旧密码"
		     		>
		     		</u-field>
			<button type="error" class="button" @click="link">确定</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'修改密码',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				pwd:'',
			}
		},
		methods: {
			 onKeyInput: function(event) {
			            this.inputValue = event.target.value
			        },
			link(){
				let item = uni.getStorageSync('LoginKey')
				this.$Api.UserInfo(item).then(res => {
					if(res.data.success){
						res.data.data.email = this.email;
						this.$Api.UpdateInfo(res.data.data).then(res => {
							if(res.data.success){
								uni.showToast({
									title:"关联成功",
									duration: 1000
								})
								setTimeout(function () {
									
								  uni.reLaunch({
								  	url: '/pages/safe/index'
								  })
											   
								                   }, 1000);
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color:#ffffff;
	font-size: 30upx;
}

.uni-input{
	background-color: #FFFFFF;
	height: 20rpx;
	font-weight: 20rpx;
}

	.button{
		// margin-top: 100rpx;
		// bottom: var(--window-bottom);
		// position: fixed;  
		bottom: -80rpx;
	}	
</style>
