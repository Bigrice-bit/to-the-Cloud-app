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
			<u-tr class="tr">
				<u-td>已签到人数{{Signed}}</u-td>
				<u-td>未签到人数{{Unsign}}</u-td>
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
				Signed: null,
				Unsign: null,
				signDate:null,
				endDate:null,
				UnSignStudents:[{
					name: null,
					note:null,
					userId:null,
				}],
				current: 0,
				Stulength: null,
				user:{},
				}
		},
		created() {
			_this = this;
		},
		onLoad: function(option){
			// decodeURIComponent 解密传过来的对象字符串
						const item = JSON.parse(decodeURIComponent(option.item));
						console.log(item)
						this.userObj = item;
						console.log(this.userObj)
						this.signDate = this.resolvingDate(this.userObj.signDate)
						console.log(this.signDate)
						this.endDate = this.resolvingDate(this.userObj.endDate)
						this.$Api.GetAllStu(this.userObj.classCourseId).then(res => {
							console.log(res)
							this.user = res.data.data
							for(var i = 0;i < res.data.data.length;i++){
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
		onShow:function(){
		setTimeout(function() {
					let temp = 0;
					console.log(temp)
					_this.$Api.SignInfo(_this.userObj.startSignId).then(res =>{
						this.UnSignStudents={}
						for(var i = 0;i < res.data.data.length;i++){
						
						console.log('res.data.data',res.data.data)
						console.log('this.user',_this.user)
						for(var j = 0;j < _this.user.length;j++){
							if(res.data.data[i].stuId == _this.user[j].stuId)
							{
								temp++;
							}
						}
						if(temp == 0){
							_this.$Api.UserInfo(res.data.data[i].stuId).then(res => {
								var obj = {
									name: res.data.data.userName,
									note:"未签到",
									userId:res.data.data.userNum
								}
									_this.UnSignStudents.push(obj)
							})
							
							}
						}
					})
				}, 1000)
		},
	

		methods: {
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
