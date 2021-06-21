<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" title="签到中" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
	
	<view>
		<u-cell-group>
				<u-cell-item  :title="begin" :value='userObj.signDate' :arrow="false" ></u-cell-item>
				<u-cell-item  :title="end" :value='userObj.endDate' :arrow="false" class="cell"></u-cell-item>
			</u-cell-group>
	</view>
	<u-table class="u-table">
			<u-tr class="tr">
				<u-td>已签到人数</u-td>
				<u-td>未签到人数</u-td>
			</u-tr>
		</u-table>
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
				}
		},
		onLoad: function(option){
			// decodeURIComponent 解密传过来的对象字符串
						const item = JSON.parse(decodeURIComponent(option.item));
						console.log(item.data.data)
						this.userObj = item.data.data;
						console.log(this.userObj)
					// console.log(new Date() - item.EndDate);
		},
		created() {
			_this = this;
		},
		methods: {
			EndSign() {
				uni.showModal({
					title: '提示',
					showCancel: true,
					content: '是否结束并完成签到',
					success(res) {
						if (res.confirm) {
							_this.userObj.isEnd = 1;
							_this.$Api.CreateSign(_this.userObj).then(res => {
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
