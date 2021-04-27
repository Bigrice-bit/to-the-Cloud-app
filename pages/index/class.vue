<template>
	<view claas="content">
		<view class="header">
			<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="isFixed" :is-back="isBack"
				:background="background" :back-text-style="{color: '#fff'}" :title="title"
				:back-icon-name="backIconName" :back-text="backText" @click="newcreate">
				<view>
					<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change"
						:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
				</view>
				<view class="navbar-right" slot="right" v-if="slotRight">
					<view class="message-box right-item">
						<u-icon name="plus" color="black" size="45" @click="newcreate"></u-icon>
					</view>
					<view class="message-box right-item">
						<u-icon name="scan" color="black" size="45" @click="joinclass"></u-icon>
						<u-badge count="0" size="mini" :offset="[-15, -15]"></u-badge>
					</view>
				</view>
			</u-navbar>
		</view>
		<view class="u-demo">
			<u-search class="search-box" shape="square" :show-action="true" action-text="搜索" :clearabled="true"
				placeholder="请输入班课名称或班课号" v-model="keyword"></u-search>
			<view class="u-demo-wrap" style="padding-left:0;padding-right:0;margin-left: -20rpx;margin-right: -5rpx;">
				<view class="u-demo-area">
					<!-- <u-cell-item center :is-link="true"  value="" index="index" @click="click" 
						 :arrow="arrow" title="高数A"><image class="img" shape="square" src="../../static/1.png" mode="widthFix"></image>
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
						</u-cell-item> -->
					<view v-for="(item, index) in objectArray" :key="index">
						<u-card margin="10rpx" :border="false" :foot-border-top="false" padding="0" @tap="click(index)">

							<view class="" slot="body">

								<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
									<image
										src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
										mode="aspectFill"></image>
									<!-- <view class="u-body-item-titleu-line-1">{{item.name}}</view> -->


									<view class="icontest">
										<!-- <u-table class="u-table">
										<u-tr>
											<u-th align="left">{{item.name}}</u-th>
											<u-th align="center" width="200rpx"></u-th>
											<u-th align="right">{{item.number}}</u-th>
										</u-tr>
										<u-tr>
											<u-td><u-icon name="phone" label="签到" ></u-icon></u-td>
											<u-td><u-icon name="rewind-right-fill" label="消息"></u-icon></u-td>
											<u-td><u-icon name="home" label="提问"></u-icon></u-td>
										</u-tr>
									</u-table> -->
										<u-row gutter="5">
											<u-col span="4">
												<view class="demo-layout">{{item.name}}</view>
											</u-col>
											<u-col span="4">
												<view class="test2">{{item.number}}</view>
											</u-col>
										</u-row>
										<u-row gutter="10" justify="space-between">
											<u-col span="4">
												<view class="">
													<u-icon name="phone" label="签到"></u-icon>
												</view>
											</u-col>
											<u-col span="4">
												<view class="">
													<u-icon name="rewind-right-fill" label="消息"></u-icon>
												</view>
											</u-col>
											<u-col span="4">
												<view class="">
													<u-icon name="home" label="提问"></u-icon>
												</view>
											</u-col>
										</u-row>


									</view>

									<view class="test">></view>
								</view>
							</view>
						</u-card>
					</view>
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
				cardTitle: '测试0',
				subTitle: '2020-05-15',
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
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
				list: [{
						name: '我创建的'
					},
					{
						name: '我加入的'
					},
				],
				current: 0,
				swiperCurrent: 0,
				objectArray: [{
					id: 0,
					name: '高数A',
					number: '111111'
				}, {
					id: 1,
					name: '高数B',
					number: '111111'
				}, {
					id: 2,
					name: '高数C',
					number: '111111'
				}, {
					id: 3,
					name: '高数D',
					number: '111111'
				}],
				stringArray: ['a', 'b', 'c']
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
				if (index == 0) {
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
				if (index == 0) {
					this.title = '新闻';
					this.useSlot = false;
					this.rightSlot = false;
				} else if (index == 1) {
					this.showAction = false;
					this.useSlot = true;
					this.rightSlot = false;
					this.search = true;
					this.slotRight = false;
				} else if (index == 2) {
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
/* 			getOrderList(index){
				console.log("ddd");
					this.loadStatus.splice(this.current,1,"loadmore")
			}, */
			bgColorChange(index) {
				this.background = {};
				if (index == 0) {
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
				if (index == 0) {
					this.slotRight = true;
					this.useSlot = false;
				} else {
					this.slotRight = false;
				}
			},
			customChange(index) {
				this.search = false;
				this.rightSlot = false;
				if (index == 0) {
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
			click(index) {
				console.log(index);
				uni.switchTab({
					url: "/pages/class/created_class/home"
				})
			},
			newcreate() {
				uni.navigateTo({
					url: "/pages/class/create"
				})
			},
			joinclass() {
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
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
	.content {
		margin-top: 25px;
	}

	.header {
		height: 20px;
		margin-top: 40px;

	}

	.img {
		width: 50%;
	}

	.u-demo {
		height: 50rpx;
		height: calc(100% - 44px);
		height: calc(100% - 44px - constant(safe-area-inset-top));
		height: calc(100% - 44px - env(safe-area-inset-top));
	}

	.wrap {
		padding: 24rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		// height: 80rpx;
		// border-radius: 10rpx;
		// margin-top: 10rpx;
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

	.message-box {}

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
		height: 100px;
		// margin-top: 100px;
	}

	.icon-text-buton {
		align-items: center;
		padding: 5px 10px;
		font-size: 20rpx;
		border-radius: 100rpx;
		margin-left: 20rpx;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 0rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.icontest {
		padding: 5rpx -10rpx;

	}

	.u-body-item-titleu-line-1 {
		margin-top: 10rpx;
		margin-left: 20rpx;
	}

	.test {

		height: 30rpx;
		// border-radius: 8rpx;
		margin-left: 100rpx;
	}

	.test2 {
		height: 30rpx;
		// border-radius: 8rpx;
		margin-left: 300rpx;
	}

	.u-demo-wrap {
		margin-top: -20px;
	}
</style>
