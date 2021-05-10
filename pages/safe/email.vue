<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<text>请输入要关联的邮箱：</text><br />
		<view class="uni-form-item uni-column">
		     <u-field
		     			v-model="email"
		     			label="邮箱账号"
		     			placeholder="请填写邮箱账号"
		     		>
		     		</u-field>
		</view>
		<button type="error" class="button">关联</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'关联邮箱',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				email:'',
			}
		},
		methods: {
			 onKeyInput: function(event) {
			            this.inputValue = event.target.value
			        },
		}
	}
</script>

<style lang="scss">
page{
	background-color:#f1f1f1;
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
