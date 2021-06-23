<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" title="签到中" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
	<view v-if="isshow">
		<u-table class="u-table">
		
			<u-tr class="tr">
				<u-td>已签到人数</u-td>
				<u-td>未签到人数</u-td>
			</u-tr>
		</u-table>
		<view class="list">
			<view class="li">
		<u-button  class="button" size="medium" @click="EndSign(0)">放弃</u-button>
		<u-button  class="button" size="medium" @click="EndSign(1)">结束</u-button>
		</view>
		</view>
	</view>
	<view v-if="!isshow">
		<u-button   size="medium" @click="EndSign(1)">结束</u-button>
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
				SignInfo: {},
				}
		},
		onLoad: function(option){
			// decodeURIComponent 解密传过来的对象字符串
						const item = JSON.parse(decodeURIComponent(option.item));
						console.log(item)
						this.SignInfo = item;
						console.log(this.SignInfo)
					// console.log(new Date() - item.EndDate);
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
								_this.SignInfo.isEnd = 1;
								_this.$Api.UpdateSignIn(_this.SignInfo).then(res => {
									console.log("结束成功!")
									uni.reLaunch({
										url: '/pages/class/created_class/home?item=' + encodeURIComponent(JSON.stringify(_this.SignInfo.classCourseId))
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
		margin-top: -1rpx;
		
	}
	
	.u-table tr {
		width:100rpx;
	}
	
	.button {
		position:relative;
		bottom: 5;
		margin-left: 115rpx;
		background-color: #ffff;
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
</style>
