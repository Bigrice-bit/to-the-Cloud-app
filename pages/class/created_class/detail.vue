<template>
			<view>

					<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
						:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
						:back-text="backText" @click="newcreate"> 
						<u-icon name="arrow-left" class="slot-wrap" @click="BackClass"></u-icon>
						</u-navbar>

				<view class="header">
					<view class="bg">
						<view class="box">
							
							<view class="box-bd">
								<view class="item">
									<!-- <view class="icon"><img src="../../static/user/message.png"></view> -->
									<view class="text">经验值</view>
								</view>
								<view class="item" @click="Person">
									<!-- <view class="icon"><img src="../../static/user/favorite.png"></view> -->
									<view class="text">个人资料</view>
								</view>
								<view class="item">
									<!-- <view class="icon"><img src="../../static/user/service.png"></view> -->
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
							<!-- <view class="icon"><image src="../../static/user/help.png"></image></view> -->
							<view class="text">班课号</view>
							<!-- <image class="to" src="../..//../static/user/to.png"></image> -->
							<p>后端返回</p>
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/help.png"></image></view> -->
							<view class="text">允许加入</view>
							<image class="to" src="../../../static/user/to.png"></image>
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/about.png"></image></view> -->
							<view class="text">学校院系</view>
							<image class="to" src="../../../static/user/to.png"></image>
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/opinion.png"></image></view> -->
							<view class="text">学习要求</view>
							<image class="to" src="../../../static/user/to.png"></image>
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/opinion.png"></image></view> -->
							<view class="text">教学进度</view>
							<image class="to" src="../../../static/user/to.png"></image>
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/opinion.png"></image></view> -->
							<view class="text">考试安排</view>
							<image class="to" src="../../../static/user/to.png"></image>
						</view>
					</view>
					<view>
						<u-button class="button" type="warning" @click="EndeClass(1)">结束班课</u-button>
						
						<u-button class="button" type="default" @click="EndeClass(2)">删除班课</u-button>
						<view class="text">只有已结束班课才可删除</view>
					</view>
		</view>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '课程名称',
				tabbar: '',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				isBack: false,
				isFixed: true,
				arrow: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				
				
			}
		},
		onLoad() {
			// const value = uni.getStorageSync("ClassKey");
			// if (value) {
			// 	console.log(value);
			// 	this.classid = value;
			// }
			
			this.tabbar = [{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '消息',
					count: 0,
					// isDot: true,
					customIcon: false,
					pagePath: "/pages/class/created_class/message"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '成员',
					customIcon: false,
					pagePath: "/pages/class/created_class/home"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '详情',
					customIcon: false,
					pagePath: "/pages/class/created_class/detail"
				},
			]
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
						uni.navigateTo({
							url: '/pages/login/login'
						})
					},
					EndeClass(index){
						if(index == 1)
						{
							console.log("结束班课")
						}
						else{
							console.log("判断是否结束班课，有则删除，未结束则提示不成功，需要先结束班课！")
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
		background-color:#ffffff;
		font-size: 30upx;
	}
	.header{
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
		width: 600upx;
		height: 250upx;
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
				// .text{
				// 	width: 100%;
				// 	text-align: center;
				// 	margin-top: 10upx;
				// }
			}
		}
	}
	.list-content{
		background: #fff;
		// margin-top: 100rpx;
	}
	.list{
		width:100%;
		border-bottom:15upx solid  #ffffff;
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
	
	.button{
		margin-top: 10rpx;
	}
	
	.text{
		color: #a6a6a6;
	}
</style>
