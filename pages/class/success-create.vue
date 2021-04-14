<template>
	<view>
	<u-navbar title-color="#fff" back-icon-color="#ffffff"
		:is-fixed="isFixed" :is-back="isBack" 
		:background="background" 
		:back-text-style="{color: '#fff'}" :title="title" 
		:back-icon-name="backIconName" :back-text="backText"
		@click="newcreate"
	>
	</u-navbar>
	<view class="content">
			<view class="canvas">
				<canvas class="canvas-hide" canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
			</view>
			<view class="image">
				<image :src="qrcodeSrc" />
				<text>image</text>
			</view>
			<button class="button" type="primary" @tap="make()">确认</button>
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
	export default{
		data(){
			return{
			title: '创建成功',
			backText: '返回',
			backIconName: 'nav-back',
			right: false,
			showAction: false,
			rightSlot: false,
			useSlot: false,
			background: {
				'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			},
			isBack: true,
			search: false,
			custom: false,
			isFixed: true,
			keyword: '',
			// #ifdef MP
			slotRight: false,
			// #endif
			// #ifndef MP
			slotRight: true,
			// #endificon: 'setting',
			arrow: true,
			label: '签到  提问 回复',
			rightSlot: true,
			checked: false,
			qrcodeText: '跳转到加入班课界面',
							qrcodeSize: uni.upx2px(590),
							qrcodeSrc: ''
			}
		},
		onLoad() {
					this.make()
				},
		methods:{
			make() {
							uni.showLoading({
								title: '二维码生成中',
								mask: true
							})
			
							uQRCode.make({
								canvasId: 'qrcode',
								text: this.qrcodeText,
								size: this.qrcodeSize,
								margin: 10
							}).then(res => {
								this.qrcodeSrc = res
							}).finally(() => {
								uni.hideLoading()
							})
						}
			  }
	}
</script>

<style>
	.swiper-item-img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	},
	.sss{
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
	
	page {
			background-color: #f0f0f0;
		}
	
		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	
		.text {
			display: flex;
			justify-content: center;
			margin-top: 50rpx;
			font-size: 36rpx;
			color: #666666;
		}
	
		.canvas {
			margin-top: 50rpx;
			text-align: center;
		}
	
		.image {
			width: 354rpx;
			margin-top: 50rpx;
			text-align: center;
		}
	
		.image image {
			display: block;
			width: 354rpx;
			height: 354rpx;
		}
	
		.input {
			width: 600rpx;
			height: 40px;
			margin: 50rpx 0;
			padding: 0 20rpx;
			border: 1px solid #b0b0b0;
			border-radius: 5px;
			background-color: #ffffff;
			box-sizing: border-box;
		}
	
		.button {
			width: 690rpx;
			margin: 10rpx;
			margin-top: 100px;
		}
		
		.button:last-child {
			margin-bottom: 50rpx;
		}
		
		.canvas-hide {
				/* 1 */
				position: fixed;
				right: 100vw;
				bottom: 100vh;
				/* 2 */
				z-index: -9999;
				/* 3 */
				opacity: 0;
			}
</style>
