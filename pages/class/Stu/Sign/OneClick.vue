<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
	
	<view v-if="!show" @click="SignStatus()">
		<!-- <u-image class="image" width="40%" height="300rpx"  src="/static/SignIn.png" @click="SignStatus()"></u-image> -->
		<view class="circle">
			<view class="text">
			签到
			</view>
			</view>
	</view>
	<view v-else>
		<!-- <u-image class="image" width="40%" height="300rpx"  src="/static/SignSuccess.png" ></u-image> -->
		<view class="circle">
				<view class="text">
				已签到
				</view>
				</view>
		</view>
	</view>
	

	</view>
</template>

<script>
	var _this;
	export default {
		
		data() {
			return {
				title: '一键签到',
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
				data:{
					startSignId:null,
					stuId:null,
					classCourseId:null,
					signStatus:"已签到",
					signLongitude: null, 	//经度
					signLatitude: null,	//纬度
				},
				show: false,
				}
		},
		onLoad: function(option){
			// decodeURIComponent 解密传过来的对象字符串
						const item = JSON.parse(decodeURIComponent(option.item));
						console.log(item)
						this.data.startSignId = item.startSignId;
						this.data.classCourseId = item.classCourseId;
						const value = uni.getStorageSync("LoginKey");
						if (value) {
							console.log(value);
							this.data.stuId = value;
						}
						
						console.log(this.SignInfo)
					// console.log(new Date() - item.EndDate);
		},
		onShow:function(){
			
		},
		created() {
			_this = this
		},
		methods: {
			SignStatus(){
				
				console.log("点击签到")
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
				         console.log('当前位置的经度：' + res.longitude);
				         console.log('当前位置的纬度：' + res.latitude);
						 _this.data.signLongitude	= res.longitude//经度
						 _this.data.signLatitude = res.latitude//纬度
						 _this.$Api.StuSign(_this.data).then(res => {
						 		if(res.data.success){
						 			
						 			_this.show = true;
						 		}
						 })
				    }
				});
				console.log(this.data)
				// console.log(this.$Api.StuSign(this.data))
				
				
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
	
	.circle {
	  margin: auto;
	  margin-top: 700upx;
	  border: 1px solid #3db8da;
	  background-color: rgba(61, 184, 218, 0.2);
	  // opacity:0.1;
	  height: 300upx;
	  width: 300upx;
	  border-radius: 150upx;
	  text-align: center;
	  align-items: center;
	  box-shadow: 0 0 29px 0px #3db8da;
	 }
	 
		 
	 .text{
		 font-size: 50rpx;
		 font-weight: bold;
		 color: #000000;
		 margin-top: 50upx;
	 }
</style>
