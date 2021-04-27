<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" title="班课名称" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view>
			<image src="" shape="circle" mode="center" @click="Signin"></image>
		</view>

		<text class="message-box">切换为按学号（经验值）显示</text>
		<u-search class="search-box" shape="square" :show-action="true" action-text="搜索" :clearabled="true"
			placeholder="请输入班课名称或班课号" v-model="keyword"></u-search>
		<view class="u-demo">
			<text>成员总数</text><text>xx人</text>
			<view class="u-demo-wrap" style="padding-left:0;padding-right:0;margin-left: -20rpx;margin-right: -5rpx;">
				<view class="u-demo-area">
					<u-cell-item center :is-link="true" value="29经验值" index="index" @click="click" :arrow="arrow"
						title="张三" icon="list-dot" :label="label" border-top="true">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" value="21经验值" index="index" @click="click" :arrow="arrow"
						title="李四" icon="list-dot" :label="label">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" value="12经验值" index="index" @click="click" :arrow="arrow"
						title="赵五" icon="list-dot" :label="label">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" value="10000经验值" index="index" @click="click" :arrow="arrow"
						title="大米" icon="list-dot" :label="label">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>


				</view>
			</view>
		</view>



		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				tabbar: '',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				keyword: '',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				label: '此处显示学号，后台返回',
			}
		},
		onLoad() {
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
		methods: {
			Signin() {
				console.log("签到");
			},
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
		/* display: flex; */
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}


	.u-demo {
		//height: 200vh;
		height: calc(100% - 44px);
		height: calc(100% - 44px - constant(safe-area-inset-top));
		height: calc(100% - 44px - env(safe-area-inset-top));
	}

	.wrap {
		padding: 24rpx;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.search-wrap {
		margin: 0 15rpx;
		flex: 1;
	}

	.right-item {
		margin: 0 10rpx;
		position: relative;
		color: #000000;
		display: flex;
	}

	.message-box {
		color: #66dc59;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.map-wrap {
		display: flex;
		align-items: center;
		padding: 4px 6px;
		background-color: rgba(240, 240, 240, 0.35);
		color: #fff;
		font-size: 22rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
	}

	.map-wrap-text {
		padding: 0 6rpx;
	}

	.search-box {
		height: 50px;
	}

	.icon-text-buton {
		align-items: center;
		padding: 5px 10px;
		font-size: 20rpx;
		border-radius: 100rpx;
		margin-left: 20rpx;

	}

	.search-wrap {
		margin: 0 15rpx;
		flex: 1;
	}
</style>
