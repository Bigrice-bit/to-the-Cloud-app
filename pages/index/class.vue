<template>
	<view claas="content">
		<view class="header">
			<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="isFixed" :is-back="isBack"
				:background="background" :back-text-style="{color: '#fff'}" :title="title"
				:back-icon-name="backIconName" :back-text="backText" @click="newcreate">
				<!-- <view>
					<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change"
						:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
				</view> -->
				<view class="trade">
					<view class="texts" :class="curr==0?'active':''" data-index="0" @tap="setCurr">
						我创建的
					</view>
					<view class="texts" :class="curr==1?'active':''" data-index="1" @tap="setCurr">
						我加入的
					</view>
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
			<view class="big">
				<swiper style="height: 100vh;" :current="curr" @change="setCurr">
					<swiper-item>
						<scroll-view v-for="(item, index) in objectArray" :key="index" v-if="index >= 1">
							<u-card margin="10rpx" :border="false" :foot-border-top="false" padding="0"
								@tap="TeaClassdetail(index)">
								<view class="" slot="body">

									<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
										<image
											src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
											mode="aspectFill"></image>
										<view>

											<u-row gutter="5">
												<u-col span="6">
													<view class="demo-layout">{{item.name}}</view>
												</u-col>
												<u-col span="5">
													<view class="test2">{{item.number}}</view>
												</u-col>
											</u-row>
											<u-row gutter="20" justify="space-between">
												<u-col span="4">
													<view class="icontest">
														<u-icon name="phone" label="签到"></u-icon>
													</view>
												</u-col>
												<u-col span="4">
													<view class="icontest">
														<u-icon name="rewind-right-fill" label="消息"></u-icon>
													</view>
												</u-col>
												<u-col span="4">
													<view class="icontest">
														<u-icon name="home" label="提问"></u-icon>
													</view>
												</u-col>
											</u-row>
										</view>

										<u-icon class="test" name="arrow-right" color="rgb(203,203,203)" :size="26">
										</u-icon>
									</view>
								</view>
							</u-card>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view v-for="(item, index) in joinArray" :key="index" v-if="index >= 1">
							<u-card margin="10rpx" :border="false" :foot-border-top="false" padding="0"
								@tap="click(index)">

								<view class="" slot="body">

									<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
										<image
											src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
											mode="aspectFill"></image>
										<view>

											<u-row gutter="5">
												<u-col span="6">
													<view class="demo-layout">{{item.name}}</view>
												</u-col>

											</u-row>
											<u-row gutter="20" justify="space-between">
												<u-col span="4">
													<view class="icontest">
														<u-icon name="phone" label="签到"></u-icon>
													</view>
												</u-col>
												<u-col span="4">
													<view class="icontest">
														<u-icon name="rewind-right-fill" label="消息"></u-icon>
													</view>
												</u-col>
												<u-col span="4">
													<view class="icontest">
														<u-icon name="home" label="提问"></u-icon>
													</view>
												</u-col>
											</u-row>
										</view>

										<u-icon class="test" name="arrow-right" color="rgb(203,203,203)" :size="26">
										</u-icon>
									</view>
								</view>
							</u-card>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>

		</view>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	var _this
	export default {
		data() {
			return {
				curr: 0,
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
				stuOrteach: true,
				setcurr: '1', // 0 我创建的 1 我加入的
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
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
					id: null,
					name: null,
					number: null
				}],
				joinArray: [{
					id: null,
					name: null,
					number: null
				}],
				classnum: '',
				stringArray: ['a', 'b', 'c'],
				creator: 0,
			}
		},
		onShow: function() {
			try {
				const value = uni.getStorageSync("lifeData");
				if (value) {
					// console.log(value);
					if (value.vuex_jurisdiction.name === '1') {
						this.stuOrteach = true
					} else {
						this.stuOrteach = false;
					}

					// console.log(this.stuOrteach);
				}
			} catch (e) {
				console.log(e);
			}

			// console.log(this.$uStoreKey);
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
		onLoad() {
			const value = uni.getStorageSync("LoginKey");
			if (value) {
				console.log(value);
				this.creator = value;
			}

			this.$Api.GetAllCreatedClass(this.creator).then(res => {
				console.log(res);
				let serve = res.data.data;
				if (res.data.success) {
					console.log(serve.length)
					for (var i = 0; i < serve.length; i++) {
						var obj = {
							id: serve[i].classCourseId,
							name: serve[i].classCourseName,
							number: serve[i].classCourseNum
						}
						console.log(obj);
						this.objectArray.push(obj);
					}
				} else {
					console.log("失败或者无班课")
				}
			})
			this.$Api.GetAllJoinedClass(this.creator).then(res => {
				console.log(res);
				let serve = res.data.data;
				if (res.data.success) {
					console.log(serve.length)
					for (var i = 0; i < serve.length; i++) {
						var obj = {
							id: serve[i].classCourseId,
							name: serve[i].classCourseName,
							number: ''
						}
						console.log(obj);
						this.joinArray.push(obj);
					}
				} else {
					console.log("失败或者无班课")
				}
			})
		},
		created() {
			_this = this
		},
		methods: {
			setCurr(e) {
				console.log(e.detail.current)
				this.setcurr = e.detail.current;
				let thisCurr = e.detail.current || e.currentTarget.dataset.index || 0;
				// console.log(thisCurr)
				this.curr = thisCurr;
			},
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
			TeaClassdetail(index) {
				console.log(index);
				console.log(this.objectArray[index].id)
				uni.reLaunch({
					url: '/pages/class/created_class/home?item=' + encodeURIComponent(JSON.stringify(this.objectArray[index].id))
				})
			},
			newcreate() {
				console.log(this.curr)
				if (this.curr === 0) //0是创建班课
				{
					if (this.stuOrteach) //true为学生
					{
						console.log("弹框显示无权限创建")
					} else {
						uni.navigateTo({
							url: "/pages/class/create"
						})
						//  console.log("创建班课");
					}
				} else {
					uni.navigateTo({
						url: "/pages/class/JoinClass/SearchClass"
					})
					console.log("跳转加入班课");
				}
			},
			// 页面数据
			getOrderList(idx) {

			},
			joinclass() {
				let i;
				uni.scanCode({
					scanType: ['QR_CODE'],
					success: function(res) {
						_this.$Api.SelectCourseById(res.result).then(res => {
							if (res) {
								uni.navigateTo({
									url: '/pages/class/JoinClass/JoinClass?item=' +
										encodeURIComponent(JSON.stringify(res))
									// url: '/pages/class/JoinClass/JoinClass'
								})
							}
						})
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						// this.classnum = res.result;
						i = res.result
					}

				});
			},
			searchBYID: function() {
				this.$Api.SelectCourseById(this.classnum).then(res => {

					uni.navigateTo({
						url: '/pages/class/JoinClass/JoinClass?item=' + encodeURIComponent(JSON.stringify(res))
					})

				})
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
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
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 40rpx;
		border-radius: 20rpx;
		margin-left: 15rpx;
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
		font-size: 30rpx;
		color: #333;
		padding: 0rpx 10rpx;
	}

	.u-body-item image {
		width: 150rpx;
		flex: 120 0 120rpx;
		height: 150rpx;
		border-radius: 8rpx;
		margin-left: 10rpx;
	}

	.icontest {
		padding: 10rpx 5rpx;
		margin-left: 35rpx;
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
		height: -1rpx;
		// border-radius: 8rpx; 
		 margin-left: 190rpx;
	}

	.u-demo-wrap {
		margin-top: -20px;
	}

	.swiper-item {
		height: 2000rpx;
	}

	.trade {
		width: 100%;
		color: #000000;
		overflow: auto;
		font-size: 30rpx;
	}

	.trade view {
		text-align: center;
		padding-left: 25upx;
		width: 30%;
		float: left;
	}

	.trade .texts.active {
		border-bottom: 8upx solid #0b910f;
	}
</style>
