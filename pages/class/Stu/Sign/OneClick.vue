<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
	
	<view>
		<u-image class="image" width="40%" height="300rpx"  src="/static/SignIn.png" @click="SignStatus()"></u-image>
	</view>
	

	</view>
</template>

<script>
	var _this;
	export default {
		
		data() {
			return {
				title: '限时签到',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				isFixed: true,
				begin: '开始时间:',
				end: '结束时间:',
				userObj: {},
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				Signed: null,
				Unsign: null,
				
				}
		},
		onLoad: function(option){
			
		},
		onShow:function(){
			
		},
		methods: {
			SignStatus(){
				console.log("点击签到")
			}
		}
	}
</script>

<style>
	.cell{
		
		title-color: #18B566;
	}
	
.content {
		background: #f2fbfa;
		width: 100vw;
		height: 100vh;
	}
	
	.text{
		line-height: 100px;   
		/* margin-top: 150rpx; */
		text-align: center;  
		font-size: 40rpx;
		color: #C0C4CC;
	}
	.text1{
		position: static;
		/* margin-top: -1rpx; */
		line-height: 150px;   
		text-align: center;  
		font-size: 80rpx;
		color: #f59a23;
		font-weight: bold;
	}
.image{
	position: fixed;
	/* margin-bottom: 200rpx; */
	margin-left: 220rpx;
	
}
	
	.button {
		margin-top: 800rpx;
	}
</style>
