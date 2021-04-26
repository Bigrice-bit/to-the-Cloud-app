<template>
	<view class="content">
		<image class="logo" src="/static/uview/common/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的',
				tabbar: ''
			}
		},
		onLoad() {
			this.tabbar = [{
							iconPath: "home",
							selectedIconPath: "home-fill",
							text: '班课',
							count: 2,
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
							iconPath: "photo",
							selectedIconPath: "photo-fill",
							text: '我的',
							customIcon: false,
							pagePath: "/pages/index/mine"
						},
					]
				}
			}
</script>

<style>
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
</style>
