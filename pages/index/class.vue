<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" 
			:is-fixed="isFixed" :is-back="isBack" 
			:background="background" 
			:back-text-style="{color: '#fff'}" :title="title" 
			:back-icon-name="backIconName" :back-text="backText"
			@click="newcreate"
		>
		<view>
		<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
			<view class="navbar-right" slot="right" v-if="slotRight">
				<view class="message-box right-item">
					<u-icon name="plus" color="black" size="45" @click="newcreate"></u-icon>
					</view>
					<view class="message-box right-item">
					<u-icon name="scan" color="black" size="45" @click="newcreate"></u-icon>
					<u-badge count="0" size="mini" :offset="[-15, -15]"></u-badge>
					
				</view>
			</view>
		</u-navbar>
		
		<view class="u-demo">
			<u-search class="search-box" shape="square" :show-action="true" action-text="搜索"  :clearabled="true" placeholder="请输入班课名称或班课号" v-model="keyword"></u-search>
			<view class="u-demo-wrap" style="padding-left:0;padding-right:0;margin-left: -20rpx;margin-right: -5rpx;">
				<view class="u-demo-area">
						<u-cell-item center :is-link="true"  value="" index="index" @click="click" 
						 :arrow="arrow" title="高数A" icon="list-dot">
							<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
							<view class="icon-text-buton">
							<u-icon name="phone" label="签到"></u-icon>
							<u-icon name="phone" label="提问"></u-icon>
							<u-icon name="phone" label="回复"></u-icon>
							</view>
							<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
						</u-cell-item>
						<u-cell-item center :is-link="true" :label="label" value="" index="index" @click="click" 
						 :arrow="arrow" title="高数B" icon="list-dot">
							<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
							<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
						</u-cell-item>
						<u-cell-item center :is-link="true" :label="label" value="" index="index" @click="click" 
						 :arrow="arrow" title="高数C" icon="list-dot">
							<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
							<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
						</u-cell-item>
						<u-cell-item center :is-link="true" :label="label" value="" index="index" @click="click"
						 :arrow="arrow" title="高数D" icon="list-dot">
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
				title: '',
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
				list: [
					{
						name: '我创建的'
					},
					{
						name: '我加入的'
					},
				],
				current: 0,
				swiperCurrent: 0,
			}
		},
		onLoad() {
			this.tabbar = [{
							iconPath: "home",
							selectedIconPath: "home-fill",
							text: '班课',
							count: 2,
						//	isDot: true,
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
				},
		computed: {
			slotRightCurrent() {
				return this.slotRight ? 0 : 1;
			}
		},
		methods: {
			titleChange(index) {
				this.useSlot = false;
				this.title = index == 0 ? '新闻' : index == 1 ? '新闻列表' : '雨打梨花深闭门，忘了青春，误了青春';
			},
			leftChange(index) {
				if(index == 0) {
					this.backText = '';
					this.backIconName = 'arrow-leftward';
				} else {
					this.backText = '返回';
					this.backIconName = 'arrow-left';
				}
			},
			searchChange(index) {
				this.title = null;
				this.useSlot = true;
				this.search = false;
				this.custom = false;
				if(index == 0) {
					this.title = '新闻';
					this.useSlot = false;
					this.rightSlot = false;
				} else if(index == 1) {
					this.showAction = false;
					this.useSlot = true;
					this.rightSlot = false;
					this.search = true;
					this.slotRight = false;
				} else if(index == 2) {
					this.useSlot = true;
					this.showAction = true;
					this.rightSlot = false;
					this.search = true;
					this.slotRight = false;
				} else {
					this.useSlot = true;
					this.search = true;
					this.showAction = false;
					this.rightSlot = true;
					this.slotRight = false;
				}
			},
			backChange(index) {
				this.isBack = !!index;
			},
			bgColorChange(index) {
				this.background = {};
				if(index == 0) {
					this.background = {
						'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
					}
				} else {
					let color = index == 1 ? '#39CCCC' : index == 2 ? '#B471CC' : '#001f3f';
					this.background = {
						background: color
					}
				}
				
			},
			rightChange(index) {
				if(index == 0) {
					this.slotRight = true;
					this.useSlot = false;
				} else {
					this.slotRight = false;
				}
			},
			customChange(index) {
				this.search = false;
				this.rightSlot = false;
				if(index == 0) {
					this.custom = true;
					this.title = null;
					this.isBack = false;
					this.useSlot = true;
				} else {
					this.useSlot = false;
					this.title = '新闻';
					this.isBack = true;
				}
			},
			click(){
				uni.switchTab({
					url:"/pages/class/created_class/home"
				})
			},
			newcreate(){
				uni.navigateTo({
					url:"/pages/class/create"
				})
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			
		}
	}
</script>

<style lang="scss" scoped>
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
		background-color: rgba(240,240, 240, 0.35);
		color: #fff;
		font-size: 22rpx;
		border-radius: 100rpx;
		margin-left: 30rpx;
	}
	
	.map-wrap-text {
		padding: 0 6rpx;
	}
	
	.search-box{
		height: 50px;
	}
	
	.icon-text-buton{
		align-items: center;
		padding: 5px 10px;
		font-size: 20rpx;
		border-radius: 100rpx;
		margin-left: 20rpx;
		
	}
</style>

