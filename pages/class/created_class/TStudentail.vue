<template>
			<view>

					<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
						:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
						:back-text="backText" @click="newcreate"> 
						<!-- <u-icon name="arrow-left" class="slot-wrap" @click="BackClass"></u-icon> -->
						</u-navbar>

				<view class="header">
					<view class="bg">
						
						<view class="box">
							<view class="box-bd">
								<view class="">
								<u-icon  slot="" size="200" class="headicon"
									name="../../../static/headimage.png"></u-icon>
								<!-- <image class="img" src="../../../static/头像.png" mode="widthFix"></image> -->
								</view><view class="text1">
									<view class="">{{name}}</view></br>
									<view class="text2">{{classnum}}</view></br>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-content">

					<view class="list">
						
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/help.png"></image></view> -->
							<view class="text">个人经验值
							<view>{{experience}}</view></view>
							<view class="detail" @click="SearchDetail">查看经验值明细</view>
							<!-- <image class="to" src="../..//../static/user/to.png"></image> -->
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/opinion.png"></image></view> -->
							<view class="text">签到经验值<view>{{allexperience}}</view></view>
						</view>
						<view class="li " >
							<!-- <view class="icon"><image src="../../static/user/opinion.png"></image></view> -->
							<view class="text">出勤等级
							<view>2级</view></view>
							
						</view>
						
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
				title: '成员详情',
				tabbar: '',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				isBack: true,
				isFixed: true,
				arrow: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				name:null,
				classnum:null,
				experience:0,
				id:null,
				allexperience:0,
			}
		},
		created() {
			_this = this
		},
		onLoad(option) {
			// const value = uni.getStorageSync("ClassKey");
			// if (value) {
			// 	console.log(value);
			// 	this.classid = value;
			
			// }
			const item = option.item;
			// this.data.ClassCourseId = item.id;
			// this.title = item.classcoursename;
			// console.log(this.title)
			console.log(item)
			// try {
				const Tvalue = uni.getStorageSync("ClassKey");
			
			// 	if (Tvalue) {
			// 		// console.log(Tvalue);
			// 		// this.classid = Tvalue;
			// 		this.$Api.SearchClass(Tvalue).then(res => {
			// 			console.log(res)
			// 			if(res.data.success){
			// 				_this.item.class = res.data.data.classCourseName,
			// 				_this.item.term  = res.data.data.term,
			// 				_this.item.classCourseNum = res.data.data.classCourseNum
			// 				_this.item.course = res.data.data.courseName
			// 			}
			// 		})
			// 		// this.$Api.SearchCourse(this.item.courseId).then(res => {
			// 		// 	this.item.course = res.data.data.courseName
			// 		// })
			// 	}
			// } catch (e) {
			// 	console.log(e);
			// }
			this.id = item
			this.$Api.UserInfo(item).then(res => {
				console.log(res)
				if(res.data.success){
					this.name = res.data.data.userName
					this.classnum = res.data.data.userNum
				
				}
			})
			this.$Api.AllExpr(item).then(res => {
				console.log(res)
				if(res.data.success){
					this.allexperience = res.data.data
				
				}
			})
			var obj={
				StuId: item,
				ClassCourseId:Tvalue
			}
			this.$Api.GetExper(obj).then(res => {
				console.log(res)
				if(res.data.success){
					this.experience = res.data.data.empiricalValue
				
				}
			})
			this.tabbar = [{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '签到记录',
					count: 0,
					// isDot: true,
					customIcon: false,
					pagePath: "/pages/class/created_class/message"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '班课成员',
					customIcon: false,
					pagePath: "/pages/class/created_class/home"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '班课详情',
					customIcon: false,
					pagePath: "/pages/class/created_class/detail"
				},
			]
				},
				methods:{
					SearchDetail(){
						console.log("跳到签到明细")
						console.log(this.id)
						uni.navigateTo({
							url: "/pages/class/Stu/SignDetail"
						})
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
				// margin: -1rpx;
				width:65%;
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
	.detail{
		color: #6fcb7a;
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
		width: 50%,
	}
	
	.text1{
		color: #000000;
		// font-weight: bold;
		font-size: 30rpx;
		// padding-right:100upx;
		margin-top: 60rpx;
		margin-right: 500rpx;
	}
	
	.text2{
		color: #cccccc;
		// font-weight: bold;
		font-size: 30rpx;

	}
	
	.headicon{
		width: 100%;
		height:100%;
		margin-top: 15rpx;
		margin-left: 300rpx ;
	}
</style>
