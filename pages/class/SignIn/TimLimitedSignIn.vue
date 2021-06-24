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
		<view></view>
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
				}
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
		},
		onShow:function(){
			// for(let i = 0; i < this.userObj.duration; i--)
			// {
				console.log(this.userObj.startSignId)
				this.$Api.SignInfo(this.userObj.startSignId).then(res => {
					// if(res.success)
					// {
					// 	console.log("学生签到信息")
					// 	console.log(res)
					// }
					console.log("学生签到信息")
					console.log(res)
				})
				
			// }
		},
		created() {
			_this = this;
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
										url: '/pages/class/created_class/home?item=' + encodeURIComponent(JSON.stringify(_this.userObj.classCourseId))
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
		margin-top: 800rpx;
	}
</style>
