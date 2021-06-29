<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate">
			<u-icon name="arrow-leftward" class="slot-wrap" @click="BackClass"></u-icon>
		</u-navbar>
		
		<view class="content">
			<!-- <view class="canvas">
				<canvas class="canvas-hide" canvas-id="qrcode"
					:style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
			</view> -->
			<image class="img" src="../../static/success-class.png" mode="center"></image>
			<view class="text">恭喜你成功创建班课，快将班课号告诉学生吧</view>
			<view class="image">
				<p class="class_number">
					{{classnum}}

					</p>
					
					<!-- <view class="Qrcode">
				<image :src="qrcodeSrc" />
				</view> -->
				<view class="Qrcode">
				<canvas canvas-id="qrcode" style="width: 2120px;height: 212px;" />
				</view>
			</view>
			<!-- <button class="button" type="primary" @tap="click()">确认</button> -->
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
	var _this
	export default {
		data() {
			return {
				title: '创建成功',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				isBack: false,
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
				qrcodeText: '',
				qrcodeSize: uni.upx2px(590),
				qrcodeSrc: '',
				Item_res: '',
				classnum: '',
			}
		},
		onLoad:function(option){//opthin为object类型，会序列化上页面传递的参数
			const item = JSON.parse(decodeURIComponent(option.item));
			console.log("success-create");
			console.log(item)
			this.classnum = item.data.data.classCourseNum
			this.qrcodeText = this.classnum
			this.make();
			// this.Item_res = item
			// this.url = '/pages/class/JoinClass/JoinClass?item=' + encodeURIComponent(JSON.stringify(this.Item_res))
			// console.log(this.classnum)
		},
		created() {
			_this = this
		},
		methods: {
			// make() {
			// 	uni.showLoading({
			// 		title: '二维码生成中',
			// 		mask: true
			// 	})
			// 	uQRCode.make({
			// 		canvasId: 'qrcode',
			// 		text: _this.classnum,
			// 		size: _this.qrcodeSize,
			// 		backgroundColor: '#ffffff',
			// 		foregroundColor: '#1dbc9d',
			// 		margin: 10,
			// 	}).then(res => {
			// 		this.qrcodeSrc = res
			// 		// uni.navigateTo({
			// 		// 	url: '/pages/class/JoinClass/JoinClass?item=' + encodeURIComponent(JSON.stringify(this.Item_res)),
			// 		// })
			// 		// url: '/pages/class/success-create?item=' + encodeURIComponent(JSON.stringify(this.Item_res))
			// 	}).finally(() => {
			// 		uni.hideLoading()
			// 		// url: '/pages/class/success-create?item=' + encodeURIComponent(JSON.stringify(this.Item_res))
			// 	})
			// },
			make() {
			      uQRCode.make({
			        canvasId: 'qrcode',
			        componentInstance: this,
			        text: this.classnum,
			        size: 215,
			        margin: 10,
			        backgroundColor: '#ffffff',
			        foregroundColor: '#1dbc9d',
			        fileType: 'jpg',
			        correctLevel: uQRCode.defaults.correctLevel,
			        success: res => {
			          console.log(res)
			        }
			      })
			    },
			BackClass(){
				console.log("点击返回")
				uni.reLaunch({
					url: '/pages/index/class'
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
	}

	,
	.sss {
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
		background-color: #ffffff;
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
	
	.slot-wrap {
			display: flex;
			margin-left: 25rpx;
			/* 如果您想让slot内容占满整个导航栏的宽度 */
			/* flex: 1; */
			/* 如果您想让slot内容与导航栏左右有空隙 */
			/* padding: 0 30rpx; */
		}

	.canvas {
		margin-top: 50rpx;
		text-align: center;
	}

	.image {
		width: 440rpx;
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

	.class_number {
		/* position: absolute; */
		font-size: 30px;
		font-weight: bold;
		color: #FA3534;
		margin-bottom: 5s0rpx;
	}
	
	.Qrcode{
		position: absolute;
		/* margin-top: 10rpx; */
		margin-bottom: 500upx;
		margin-right: 200rpx;
	}
	
	.text{
		font-size: 30rpx;
		font-weight: bold;
		/* font-style: inherit; */
		margin-left: 50rpx;
		margin-top: 0rpx;
		margin-bottom: 100rpx;
	}
	
	.img{
		margin-bottom: 10rpx;
	}
</style>
