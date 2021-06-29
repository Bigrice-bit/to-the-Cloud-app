<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" title="签到中" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
	<view>
		<u-table class="u-table">
		
			<u-tr >
				<u-td><text class="text">{{Signed}}</text>
						已签到人数</u-td>
				<u-td><text class="text">{{Unsign}}</text>
					未签到人数</u-td>
			</u-tr>
		</u-table>
		<view>
			<swiper class="swiper" @change="change">
					<swiper-item >
						<u-grid :col="4" >
							<u-grid-item   v-for="(item, index) in UnSignStudents" :index="index" :key="index" bg-color="#f2fbfa">
								<u-icon name="../../../static/headimage.png" :size="100" ></u-icon>
								<view ><text class="grid-text" >{{item.stuName}}</text></view>
								<view ><text class="grid-text" >{{item.signStatus}}</text></view>
								<!-- <text class="grid-text">大米</text>
								<text class="grid-text">未签到</text> -->
							</u-grid-item>
						</u-grid>
					</swiper-item>
					
				</swiper>
			</u-grid>
		</view>
		<view class="button1"><u-button   size="medium" @click="EndSign(0)">放弃</u-button></view>
		<view class="button2"><u-button   size="medium" @click="EndSign(1)">结束</u-button></view>
		
	</view>
	</view>
	</template>
<script>
	var _this;
	export default {
		
		data() {
			return {
				title: '我的',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: false,
				isFixed: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				isshow:false,
				userObj: {},
				UnSignStudents:'',
				startid:null,
				user:{},
				Signed: 0,
				Unsign: 0,
				}
		},
		onLoad: function(option){
			// decodeURIComponent 解密传过来的对象字符串
					const item = JSON.parse(decodeURIComponent(option.item));
						// console.log(item)
					this.userObj = item;
					console.log(this.userObj)
					// console.log(this.userObj)
				
						this.getList()

					
					this.$Api.GetAllStu(this.userObj.classCourseId).then(res => {
						if(res.data.success)
						{
							this.Unsign = res.data.data.length
						}
					})
		},
		onShow() {
			this.getList()
			// setTimeout(onLoad(),1000)
		},
		created() {
			_this = this;
		},
		methods: {
			getList(){
				let temp = 0;
				this.$Api.SignInfo(this.userObj.startSignId).then(res => {
					console.log(res)
					this.UnSignStudents = res.data.data
					for(var i = 0;i < this.UnSignStudents.length;i++){
					if(this.UnSignStudents[i].signStatus == "已签到")
					{
						temp++;
						this.UnSignStudents.splice(i,1)
					}
					}
					this.Unsign = this.UnSignStudents.length;
					this.Signed = temp
				})
			},
			EndSign(index) {
				if(index == 0)
				{
					uni.showModal({
						title: '提示',
						showCancel: true,
						content: '是否放弃这次签到',
						success(res) {
							if (res.confirm) {
								console.log('放弃签到')
								console.log(_this.userObj)
								console.log(_this.userObj.startSignId)
								_this.$Api.DeleteSign(_this.userObj.startSignId).then(res => {
									if(res.data.success){
										
										_this.$Api.SearchClass(_this.userObj.classCourseId).then(async (res) => {
												if(res.data.success)
												{
													console.log(res)
													let obj = {
														id: res.data.data.classCourseId,
														classcoursename: res.data.data.courseName,
													}
													
													uni.showToast({
													title: '放弃成功',
													duration: 1000
													});
													setTimeout(function () {
														
													  uni.reLaunch({
													  	url: '/pages/class/created_class/home'
													  })
																   
													                   }, 1000);
													
												}
												
											})
												}
										})
										
								// uni.navigateBack({})
							} else if (res.cancel) {
								console.log('用户点击取消')
								
							}
						}
					})
				}
				else{
					uni.showModal({
						title: '提示',
						showCancel: true,
						content: '是否结束并完成签到',
						success(res) {
							if (res.confirm) {
								console.log('结束签到')
								console.log(_this.userObj)
								_this.userObj.isEnd = 1;
								_this.$Api.UpdateSignIn(_this.userObj).then(res => {
									// console.log(res)
									console.log("结束成功!")
									// let Classname =  uni.getStorageSync("ClassKey")
									
								
									_this.$Api.SearchClass(_this.userObj.classCourseId).then(async (res) => {
										if(res.data.success)
										{
											console.log(res)
											let obj = {
												id: res.data.data.classCourseId,
												classcoursename: res.data.data.courseName,
											}
											console.log("obj")
											console.log(obj)
											uni.showToast({
											title: '成功结束班课',
											duration: 1000
											});
											setTimeout(function () {
												
											  uni.reLaunch({
											  	url: '/pages/class/created_class/home'
											  })
														   
											                   }, 1000);
											
										}
										
									})
									
									
								})
								// uni.navigateBack({})
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
				
			}
	},
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
	
	.u-table{
		margin-top: 40rpx;
		
	}
	
	.u-table tr {
		width:100rpx;
	}
	
	.text{
		font-weight: bold;
		font-size: 50rpx;
	}
	
	.button1 {
		position:absolute;
		bottom: 5;
		margin-left: 110rpx;
		background-color: #ffff;
		margin-top:50rpx;
	}
	
	.button2 {
		position:absolute;
		bottom: 5;
		margin-left: 420rpx;
		background-color: #ffff;
		margin-top:50rpx;
	}
	
	.list{
		width:100%;
		border-bottom: 10supx solid  #f1f1f1;
		background: #f2fbfa;
		margin-top: 1100rpx;
		&:last-child{
			border: none;
		}
		.li{
			width:92%;
			height:10upx;
			padding:0 4%;
			border-bottom:1px solid rgb(243,243,243);
			display:flex;
			align-items:center;
		}
		}
		
		.swiper{
			height: 900rpx;
			/* width: 700rpx; */
		}
		/* .tr{
			height: 900rpx;
			width: 700rpx;
		} */
</style>
