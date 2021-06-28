<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" title="签到中" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
	<view>
		<u-table class="u-table">
		
			<u-tr >
				<u-td>已签到人数</u-td>
				<u-td>未签到人数</u-td>
			</u-tr>
		</u-table>
		<view>
			<swiper class="swiper" @change="change">
					<swiper-item>
						<u-grid :col="4" >
							<u-grid-item v-for="(item, index) in UnSignStudents" :index="index" v-if="index >= 1" :key="index" bg-color="#f2fbfa">
								<u-icon name="../../../static/headimage.png" :size="100" ></u-icon>
								<text class="grid-text">{{item.name}}</text>
								<text class="grid-text">{{item.note}}</text>
								<!-- <text class="grid-text">大米</text>
								<text class="grid-text">未签到</text> -->
							</u-grid-item>
						</u-grid>
					</swiper-item>
					
				</swiper>
			</u-grid>
		</view>
		<view><u-button  class="button1" size="medium" @click="EndSign(0)">放弃</u-button></view>
		<view><u-button  class="button2" size="medium" @click="EndSign(1)">结束</u-button></view>
		
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
				UnSignStudents:[{
					name: null,
					note:null,
					userId:null,
				}],
				startid:null,
				user:{},
				}
		},
		onLoad: function(option){
			// decodeURIComponent 解密传过来的对象字符串
						const item = JSON.parse(decodeURIComponent(option.item));
						// console.log(item)
					this.userObj = item;
					console.log("以下")
					// console.log(this.userObj)
					this.$Api.GetAllStu(this.userObj.classCourseId).then(res => {
						console.log(res)
						this.user = res.data.data
						for(var i = 0;i < use.length;i++){
						var obj = {
							name: res.data.data[i].userName,
							note:"未签到",
							userId:res.data.data[i].userId
						}
						// console.log("_this.UnSignStudents")
						// console.log(res.data.data.userName)
						_this.UnSignStudents.push(obj)
						}
						// console.log(_this.UnSignStudents)
					})
					this.Stulength = this.UnSignStudents.length
		},
		onShow() {
			setTimeout(function() {
						let temp = 0;
						console.log(temp)
						_this.$Api.SignInfo(_this.userObj.startSignId).then(res =>{
							// this.UnSignStudents={}
							// for(var i = 0;i < res.data.data.length;i++){
							// var obj = {
							// 	name: res.data.data[i].userName,
							// 	note:"未签到",
							// 	userId:res.data.data[i].userId
							// }
							// for(var j = 0;j < this.user.length;j++){
							// 	if(res.data.data[i].stuId == this.user[j].stuId)
							// 	{
							// 		temp++;
							// 	}
							// }
							// if(temp = 0)
							// // console.log("_this.UnSignStudents")
							// // console.log(res.data.data.userName)
							// 	_this.UnSignStudents.push(obj)	
							// }
							this.UnSignStudents.filter(item => {
							                    if (item.signStatus.indexOf(this.search) !== -1 ) {
							                        newItems.push(item);
							                    }
							                })
						})
					}, 60000)
		},
		created() {
			_this = this;
		},
		methods: {
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
	
	.button1 {
		position:absolute;
		bottom: 5;
		margin-left: 110rpx;
		background-color: #ffff;
		margin-top:130rpx;
	}
	
	.button2 {
		position:absolute;
		bottom: 5;
		margin-left: 420rpx;
		background-color: #ffff;
		margin-top:130rpx;
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
