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
								<view class="avator">
								<image class="img" src="../../../../static/1.png" mode="widthFix"></image>
								</view><view class="text1">
									<view class="">{{item.course}}</view></br>
									<view class="">{{item.class}}</view></br>
									<view class="">{{item.term}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-content">

					<view class="list">
						
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/help.png"></image></view> -->
							<view class="text">班课号</view>
							<!-- <image class="to" src="../..//../static/user/to.png"></image> -->
							<p>{{item.classCourseNum}}</p>
						</view>
						
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/about.png"></image></view> -->
							<view class="text">学校院系</view>
							<image class="to" src="../../../../static/user/to.png"></image>
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/opinion.png"></image></view> -->
							<view class="text">学习要求</view>
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/opinion.png"></image></view> -->
							<view class="text">教学进度</view>
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/opinion.png"></image></view> -->
							<view class="text">考试安排</view>
						</view>
					</view>
					<view>
						<u-button class="button" type="warning" @click="EndeClass">退出班课</u-button>
					</view>
		</view>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	var _this
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
				checked:false,
				classid: null,
				item:{
					course: null,
					class: null,
					term: null,
					classCourseNum: null,
					collegepointid:null,	//学校
					courseId: null,
				}
				
			}
		},
		created() {
			_this = this
		},
		onLoad() {
			// const value = uni.getStorageSync("ClassKey");
			// if (value) {
			// 	console.log(value);
			// 	this.classid = value;
			// }
			try {
				const Tvalue = uni.getStorageSync("ClassKey");
			
				if (Tvalue) {
					// console.log(Tvalue);
					// this.classid = Tvalue;
					this.$Api.SearchClass(Tvalue).then(res => {
						console.log(res)
						if(res.data.success){
							_this.item.class = res.data.data.classCourseName,
							_this.item.term  = res.data.data.term,
							_this.item.classCourseNum = res.data.data.classCourseNum
							_this.item.course = res.data.data.courseName
						}
					})
					// this.$Api.SearchCourse(this.item.courseId).then(res => {
					// 	this.item.course = res.data.data.courseName
					// })
				}
			} catch (e) {
				console.log(e);
			}
			
			this.tabbar = [{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '签到记录',
					count: 0,
					// isDot: true,
					customIcon: false,
					pagePath: "/pages/class/Stu/Detail/record"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '班课成员',
					customIcon: false,
					pagePath: "/pages/class/Stu/Detail/home"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '班课详情',
					customIcon: false,
					pagePath: "/pages/class/Stu/Detail/detail"
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
							console.log("弹框是否退出班课")	
					},
					radio(){
						this.checked = !this.checked;
						if(!this.checked)
						{
							console.log("此时不允许加入班课")
							console.log("弹框提醒")
						}
					},
					
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
		height: 300upx;
		padding-bottom: 110upx;
		.bg{
			width: 100%;
			height:200upx;
			padding-top:40upx;
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
					width: 1upx;
					height: 1upx;
					
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
		margin-top: -1rpx;
	}
	.list{
		width:100%;
		border-bottom: 5upx solid  #ffffff;
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
				margin: -1rpx;
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
		margin-top: 30rpx;
	}
	
	.text{
		color: #a6a6a6;
		padding-right:-1upx;
		// margin: rpx;
		width:100%;

		// margin: 0upx 0;
	}
	
	.avator {
		width: 200upx;
		height: 250upx;
		overflow: hidden;
		border-radius: 10rpx;
		border-style: ridge;
		border-color: #f7f7f7;
		margin-right: 220rpx;
	}
	
	.avator .img {
		width: 100%
	}
	
	.text1{
		color: #000000;
		// font-weight: bold;
		font-size: 30rpx;
		// padding-right:100upx;
	}
</style>
