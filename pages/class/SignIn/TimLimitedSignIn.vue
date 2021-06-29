<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" title="签到中" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
	
	<view>
		<u-cell-group>
				<u-cell-item  :title="begin" :value='signDate' :arrow="false" ></u-cell-item>
				<u-cell-item  :title="end" :value='endDate' :arrow="false" class="cell"></u-cell-item>
			</u-cell-group>
	</view>
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
					<swiper-item>
						<u-grid :col="4" >
							<u-grid-item v-for="(item, index) in UnSignStudents" :index="index"  :key="index" bg-color="#f2fbfa">
								<u-icon name="../../../static/headimage.png" :size="100" ></u-icon>
								<text class="grid-text">{{item.stuName}}</text>
								<text class="grid-text">{{item.signStatus}}</text>
								<!-- <text class="grid-text">大米</text>
								<text class="grid-text">未签到</text> -->
							</u-grid-item>
						</u-grid>
					</swiper-item>
				</swiper>
				<!-- <view class="indicator-dots" v-if="isSwiper">
					<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
					</view>
					<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
					</view>
					<view class="indicator-dots-item" :class="[current == 2 ? 'indicator-dots-active' : '']">
					</view>
				</view> -->
<!-- 		<u-grid :col="4" v-for="(item, index) in UnSignStudents" :key="index" v-if="index >= 1">
				<u-grid-item>
					<u-icon name="../../../static/头像.png" :size="150"></u-icon>
					 <view class="grid-text"><image src="../../../static/头像.png" class="icon" mode="" ></image></view> -->
				<!-- 	</br>{{item.name}}</br>
					{{item.note}}
				</u-grid-item>
				<u-grid-item>
					<u-icon name="../../../static/头像.png" :size="150"></u-icon>
					<!-- <view class="grid-text"><image src="../../../static/头像.png" class="icon" mode="" ></image></view> -->
				<!-- 	</br>{{item.name}}</br>
					{{item.note}}
				</u-grid-item> --> 
			<!-- 	<u-grid-item>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">沙漏</view>
				</u-grid-item> -->
			</u-grid>
		</view>
		<button class="button" type="default" @click="EndSign">结束签到</button>
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
				begin: '开始时间:',
				end: '结束时间:',
				userObj: {},
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				Signed: 0,
				Unsign: 0,
				signDate:null,
				endDate:null,
				UnSignStudents:[],
				current: 0,
				duration: 0,
				user:{},
				}
		},
		created() {
			_this = this;
		},
		onLoad: function(option){
			// decodeURIComponent 解密传过来的对象字符串
						const item = JSON.parse(decodeURIComponent(option.item));
						// console.log(item)
					this.userObj = item;
					this.signDate = this.resolvingDate(this.userObj.signDate)
					this.endDate = this.resolvingDate(this.userObj.endDate)
					this.duration = this.userObj.duration
						this.getList()
					this.Unsign = this.UnSignStudents.length
					this.$Api.GetAllStu(this.userObj.classCourseId).then(res => {
						if(res.data.success)
						{
							this.Unsign = res.data.data.length
						}
					})
		},
		onShow() {
			this.getList()
		},
	

		methods: {
			getList(){
				
					console.log(this.duration)
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
				// }else{
				// 	console.log(this.duration)
				// 	uni.showToast({
				// 		title:"限时结束",
				// 		duration: 1000,
				// 	})
				// 	setTimeout(function () {
						
				// 	  _this.userObj.isEnd = 1;
				// 	  	_this.$Api.UpdateSignIn(_this.userObj).then(res => {
				// 	  		console.log(res)
				// 	  		if(res.data.success){
				// 	  			uni.reLaunch({
				// 	  				url: '/pages/class/created_class/home'
				// 	  			})
				// 	  		}
				// 	  	})
				// 	  	// uni.navigateBack({})
								   
				// 	                   }, 1000);
				// }
			},
			resolvingDate(date){
			//date是传入的时间
			  let d = new Date(date);
			
			  let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
			  let day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
			  let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
			  let min = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
			  let sec = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
			
			  let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
			
			  return times
			},
			EndSign() {
				uni.showModal({
					title: '提示',
					showCancel: true,
					content: '是否结束并完成签到',
					success(res) {
						
						if (res.confirm) {
							_this.userObj.isEnd = 1;
							_this.$Api.UpdateSignIn(_this.userObj).then(res => {
								console.log(res)
								if(res.data.success){
									uni.reLaunch({
										url: '/pages/class/created_class/home'
									})
								}
							})
							// uni.navigateBack({})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			change(e) {
							this.current = e.detail.current;
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
	
	.u-table{
		margin-top: 100rpx;
		
	}
	
	.u-table tr {
		width:100rpx;
	}
	
	.button {
		margin-top: 250rpx;
	}
	
	.icon{
		/* margin-left: 30rpx; */
		width: 100rpx;
		height: 100rpx;
	}
	.text{
		font-weight: bold;
		font-size: 50rpx;
	}
	
	.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}

.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
	
	.swiper {
		height: 480rpx;
	}
	
	.indicator-dots {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.indicator-dots-item {
		background-color: $u-tips-color;
		height: 6px;
		width: 6px;
		border-radius: 10px;
		margin: 0 3px;
	}
	
	.indicator-dots-active {
		background-color: $u-type-primary;
	}
</style>
