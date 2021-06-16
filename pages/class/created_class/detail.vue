<template>
	<view class="content">
			<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
				:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
				:back-text="backText" @click="newcreate">
				<u-icon name="arrow-left" @click="click1"></u-icon>
			</u-navbar>
		<image class="logo" src="/static/uview/common/logo.png"></image>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
		<text>是否允许加入班课</text>
		<u-radio-group v-model="value" @change="radioGroupChange">
					<u-radio 
						@change="radioChange" 
						v-for="(item, index) in list" :key="index" 
						:name="item.name"
						:disabled="item.disabled"
					>
						{{item.name}}
					</u-radio>
				</u-radio-group>
				<u-button class="button" type="error" @click="deleteclass">结束班课</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBack: false,
				search: false,
				custom: false,
				isFixed: true,
				title: '详情',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				tabbar: '',
				
							list: [
								{
									name: '是',
									disabled: false
								},
								{
									name: '否',
									disabled: false
								},
								
								],
								value: '是',
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
			click1(){
				uni.switchTab({
					url:'/pages/index/class'
				})
			},
				// 选中某个单选框时，由radio时触发
				radioChange(e) {
					// console.log(e);
				},
				// 选中任一radio时，由radio-group触发
				radioGroupChange(e) {
					// console.log(e);
				},
				deleteclass(){
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '是否确认删除班课',
						success(res) {
							if (res.confirm) {
								// console.log('用户点击确定')
								// uni.navigateBack({})
								
								uni.showToast({
								title: '删除成功',
								duration: 1000,
								});
								setTimeout(function () {
									// this.$mc.vuex = ('vuex_jurisdiction','1')
								
										// this.$u.vuex("vuex_jurisdiction","1");
								               uni.switchTab({
								               	url: '/pages/index/class'
								               });
								                   }, 1000);
								
							} else if (res.cancel) {
								// console.log('用户点击取消')
							}
						}
					})
				}
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
	
	.button{
		margin-top: 450rpx;
	}
</style>
