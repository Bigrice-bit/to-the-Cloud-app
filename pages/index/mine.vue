<template>
			<view>
				<view class="header">
					<view class="bg">
						<view class="box">
							<view class="box-hd">
								<view class="avator">
									<image class="img" src="../../static/headimage.png" mode="widthFix"/>
								</view>
								<view class="phone-number">{{phoneNumber}}</view>
							</view>
							<view class="box-bd">
								<view class="item" >
									<view class="exprtext">{{expr}}</view>
									<view class="text">总经验值</view>
								</view>
								<view class="item" @click="Person">
									<view class="icon"><image class="img1" src="../../static/user/favorite.png" /></view>
									<view class="text">个人资料</view>
								</view>
								<view class="item">
									<view class="icon"><image class="img1" src="../../static/user/service.png" /></view>
									<view class="text">我的空间</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-content">
					<view class="list">
						<!-- <view class="li noborder" >
							<view class="icon"><image src="../../static/user/card.png"></image></view>
							<view class="text">我的名片</view>
							<image class="to" src="../../static/user/to.png"></image>
						</view> -->
					</view>
					<view class="list">
						
						<view class="li " >
							<view class="icon"><image src="../../static/user/help.png"></image></view>
							<view class="text" @click="to(1)">用户协议</view>
							<image class="to" src="../../static/user/to.png"></image>
						</view>
						<view class="li " >
							<view class="icon"><image src="../../static/user/help.png"></image></view>
							<view class="text" @click="to(2)">隐私政策</view>
							<image class="to" src="../../static/user/to.png"></image>
						</view>
						<view class="li " >
							<view class="icon"><image src="../../static/user/about.png"></image></view>
							<view class="text" @click="to(3)">关于我们</view>
							<image class="to" src="../../static/user/to.png"></image>
						</view>
						
					</view>
					<view class="list">
						<view class="li noboder" @click="safe">
							<view class="icon"><image src="../../static/user/opinion.png"></image></view>
							<view class="text" >账号安全</view>
							<image class="to" src="../../static/user/to.png"></image>
						</view>
			</view>
			
		</view>
		<u-button shape="circle" :plain="true" type="default" style="margin-top: 200rpx;" @click="exit">退出当前账号</u-button>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	var _this
	export default {
		data() {
			return {
				title: '我的',
				tabbar: '',
				phoneNumber: '暂未登录',
				creator: null,
				expr:null,
				
			}
		},
		onLoad() {
			const value = uni.getStorageSync("LoginKey");
			if (value) {
				console.log(value);
				this.creator = value;
			}
			else{
				console.log("获取失败")
			}
			this.$Api.UserInfo(this.creator).then(res => {
				console.log(res)
				if(res.data.success)
				{
					
					this.phoneNumber = res.data.data.phone
				}
			})
			this.$Api.AllExpr(this.creator).then(res => {
				if(res.data.success){
					this.expr = res.data.data
				}
			})
			this.tabbar = [{
							iconPath: "home",
							selectedIconPath: "home-fill",
							text: '班课',
							// isDot: true,
							customIcon: false,
							pagePath: "/pages/index/class"
						},
						{
							iconPath: "photo",
							selectedIconPath: "photo-fill",
							text: '发现',
							customIcon: false,
							pagePath: "/pages/index/find"
						},
						{
							iconPath: "account-fill",
							selectedIconPath: "account-fill",
							text: '我的',
							customIcon: false,
							pagePath: "/pages/index/mine"
						},
					]
				},
				created() {
					_this = this
				},
				methods:{
					Person(){
						uni.navigateTo({
								url: '../Mine/Person'
						});
					},
					safe(){
						uni.navigateTo({
								url: '../safe/index'
						});
					},
					exit(){
						let t = uni.getStorageSync('LoginKey')
						uni.showModal({
							title: '提示',
							content: '是否确认退出登录',
							success: function(res) {
								if (res.confirm) {
									_this.$Api.Exit(t).then(res => {
										if(res.data.success){
											uni.removeStorageSync('LoginKey');
											uni.removeStorageSync('lifeData');
											uni.removeStorageSync('ClassKey');
											uni.removeStorageSync('TOKEN');
											uni.showToast({
														title:"退出成功",
														duration: 1000
													})
													setTimeout(function () {
														
													 uni.navigateTo({
													 	url: '/pages/login/login'
													 })
																   
													                   }, 1000);
												
											
										}
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						
						
						
						
					},
		
					to(index){
						if(index == 1)
						{
							uni.navigateTo({
								url: '/pages/Mine/agreement'
							})
						}
						else if(index == 2)
						{
							uni.navigateTo({
								url: '/pages/Mine/Privacy'
							})
						}
						else{
							uni.navigateTo({
								url: '/pages/Mine/about'
							})
						}
					}
				}
			}
</script>

<style lang="scss">>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	page{
		background-color:#f1f1f1;
		font-size: 30upx;
	}
	.header{
		margin-top: 40rpx;
		background: #fff;
		height: 390upx;
		padding-bottom: 110upx;
		.bg{
			width: 100%;
			height:200upx;
			padding-top:100upx;
			background-color:#1ABC9C;
		}
	}
	.box{
		width: 650upx;
		height: 280upx;
		border-radius: 20upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2); 
		.box-hd{
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			.avator{
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.phone-number{
				width: 100%;
				text-align: center;
			}
		}
		.box-bd{
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;
			.item{
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;
				&:last-child{
					border: none;
				}
				.icon{
					width: 60upx;
					height: 60upx;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}
	.list-content{
		background: #fff;
		// margin-top: 100rpx;
	}
	
	.exprtext{
		font-weight: bold;
		font-size: 45rpx;
	}
	
	.img{
		width: 160upx;
		height: 160upx;
	}
	
	.img1{
		width: 60upx;
		height: 60upx;
	}
	
	.list{
		width:100%;
		border-bottom:15upx solid  #f1f1f1;
		background: #fff;
		&:last-child{
			border: none;
		}
		.li{
			width:92%;
			height:100upx;
			padding:0 4%;
			border-bottom:1px solid rgb(243,243,243);
			display:flex;
			align-items:center;
		&.noborder{
			border-bottom:0
			}
			.icon{
				flex-shrink:0;
				width:50upx;
				height:50upx;
				image{
					width:50upx;
					height:50upx;
				}
			}
			.text{
				padding-left:20upx;
				width:100%;
				color:#666;
			}
			.to{
				flex-shrink:0;
				width:40upx;
				height:40upx;
			}
		}
	}
</style>
