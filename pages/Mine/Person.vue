<template>
	<view>
		<view class="list-content">
			<view class="list">
				<view class="li " >
					<view class="avator">
						<image class="img" src="../../static/user/face.jpg" mode="widthFix"></image>
					</view>
					<view class="text">
						<view class="phone-number">陈泓敏</view>
						<view class="phone-number">18909XXXX67</view></view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="li " >
					<view class="text">姓名</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">账号</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">选择性别</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">你所在的学校、院系及专业</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">选择身份</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">我是老师</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">我是学生</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">其他</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">学号/工号</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
		</view>
		<button type="error" style="margin-top: 200rpx;">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onLoad() {
		},
		methods: {
			Person(){
				uni.navigateTo({
						url: './Person'
				});
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color:#f1f1f1;
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
		background-color:#4191ea;
	}
}

.avator {
		width: 150upx;
		height: 150upx;
		overflow: hidden;
		// border-radius: 100rpx;
		// border-style: ridge;
		// border-color: #000000;
	}

	.avator .img {
		width: 100%
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
		.avator1{
			width: 100upx;
			height: 100upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;
			
			img{
				width: 50%;
				height: 50%;
				
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
				width: 100upx;
				height: 100upx;
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
	margin-top: 50rpx;
}
.list{
	width:100%;
	border-bottom:15upx solid  #f1f1f1;
	background: #fff;
	&:last-child{
		border: none;
	}
	.li{
		width:100%;
		height:100upx;
		padding:0 4%;
		border-bottom:1px solid rgb(243,243,243);
		display:flex;
		align-items:center;
	&.noborder{
		border-bottom:0
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
