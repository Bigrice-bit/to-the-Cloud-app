<template>
	<view>
		<u-navbar title-color="#fff" back-icon-color="#ffffff" 
			:is-fixed="isFixed" :is-back="isBack" 
			:background="background" 
			:back-text-style="{color: '#fff'}" :title="title" 
			:back-icon-name="backIconName" :back-text="backText"
			@click="newcreate"
		>
			<view class="navbar-right" slot="right" v-if="slotRight">
				<view class="message-box right-item">
					<u-icon name="plus" size="38" @click="newcreate"></u-icon>
					<u-badge count="0" size="mini" :offset="[-15, -15]"></u-badge>
				</view>
			</view>
		</u-navbar>
		
		<view class="u-demo">
			<view class="u-demo-wrap" style="padding-left:0;padding-right:0;margin-left: -20rpx;margin-right: -5rpx;">
				<view class="u-demo-area">
						<u-cell-item center :is-link="true" :label="label" value="" index="index" @click="click" 
						 :arrow="arrow" title="高数A" icon="list-dot">
							<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
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
				title: '我创建的',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
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
				checked: false
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
				uni.navigateTo({
					url:"/pages/class/create"
				})
			},
			newcreate(){
				uni.navigateTo({
					url:"/pages/class/create"
				})
			}
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
		margin: 0 20rpx;
		flex: 1;
	}
	
	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #ffffff;
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
</style>

