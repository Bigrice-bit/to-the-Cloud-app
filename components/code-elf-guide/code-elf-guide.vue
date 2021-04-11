<template>
	<view class="content">
		<swiper :indicator-dots="true" class="swiper" :autoplay="autoplay">
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-item-img" src="../../static/1.png" mode="scaleToFill"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-item-img" src="../../static/2.png" mode="scaleToFill"></image>
					<view class="jump-over" @click="launchFlag()">{{jumpover}}</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-item-img" src="../../static/3.png" mode="scaleToFill"></image>
					<!-- <view class="swiper-item-img"><image src="../../static/guide/icon_03.png" mode="aspectFit"></image></view> -->
				</view>
				<view class="jump-over" @click="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-item-img" src="../../static/3.png" mode="scaleToFill"></image>
				</view>
				<view class="experience" @click="launchFlag()">{{experience}}</view>
			</swiper-item>
		</swiper>
		<!-- <view class="uniapp-img"><image src="../../static/guide/uniapp4@2x.png" mode="aspectFit"></image></view>
	</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: '701px', //定义手机屏幕高度值变量      
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		methods: {
			launchFlag: function() {
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
					key: 'launchFlag',
					data: true,
				});
				getCurrentPages().pop();
				uni.reLaunch({
					url: '/pages/register/register'
				});
			}
		}
	}
</script>
<style>
	.content {
		width: 100%;
		height: 100%;
		background-size: 100% auto;
		padding: 0;
	}

	.swiper {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		display: flex;
		/* justify-content: center; */
		align-items: flex-end;
		flex-direction: column-reverse
	}

	.swiper-item-img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	.swiper-item-img image {
		width: 80%;
	}

	/* 	.uniapp-img{
		height: 20%;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items:center;
		overflow: hidden;
	}
	.uniapp-img image{
		width: 40%;
	} */

	.jump-over,
	.experience {
		position: absolute;
		height: 80upx;
		line-height: 80upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 35upx;
		color: #454343;
		border: 1px solid #454343;
		z-index: 999;
	}

	.jump-over {
		right: 35upx;
		top: 80upx;
	}

	.experience {
		right: 50%;
		margin-right: -105upx;
		bottom: 100upx;
	}
</style>
