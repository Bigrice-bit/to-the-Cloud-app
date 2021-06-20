<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" title="班课名称" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view>
			<image class="img" src="../../../static/发起签到.png" shape="circle" mode="center" @click="Signin"></image>
		</view>

		<text class="message-box">切换为按学号（经验值）显示</text>
		<u-search class="search-box" shape="square" :show-action="true" action-text="搜索" :clearabled="true"
			placeholder="请输入班课名称或班课号" v-model="keyword"></u-search>
		<view class="u-demo">
			<text>成员总数</text><text class="text">{{stunum}}人</text>
			<view class="u-demo-wrap" style="padding-left:0;padding-right:0;margin-left: -20rpx;margin-right: -5rpx;">
				<view class="u-demo-area">
					<<!-- u-cell-item center :is-link="true" value="29经验值" index="index" @click="click" 
						title="张三" icon="list-dot" :label="label" :border-top="true">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" value="21经验值" index="index" @click="click" 
						title="李四" icon="list-dot" :label="label">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" value="12经验值" index="index" @click="click" 
						title="赵五" icon="list-dot" :label="label">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" value="10000经验值" index="index" @click="click" 
						title="大米" icon="list-dot" :label="label">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item> -->
					<swiper-item>
						<scroll-view v-for="(item, index) in Students" :key="index" v-if="index >= 1">
							<u-card margin="10rpx" :border="false" :foot-border-top="false" padding="0"
								@tap="TeaClassdetail(index)">
								<view class="" slot="body">

									<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
										<text>1</text>
										<view>

											<u-row gutter="5">
												<u-col span="6">
													<view class="demo-layout">{{item.name}}</view>
												</u-col>
												
												<u-col span="5">
													<view class="test">{{item.id}}</view>
												</u-col>
												<u-col span="14">
													<view class="test2">{{item.experience}}经验值</view>
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

				</view>
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
				arrow: true,
				keyword: '',
				stunum: '',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				label: '此处显示学号，后台返回',
				Students:[{
					name: null,
					id: null,
					experience : null,
					}
				]
			}
		},
		onLoad:function(option){//opthin为object类型，会序列化上页面传递的参数
		// console.log(option.item)
				var expr = 0;
				const item = option.item;
				console.log(item)
				this.$Api.GetAllStu(item).then(res => {
					console.log(res)
					this.stunum = res.data.data.length;
					for(var i = 0;i < this.stunum;i++){
						
						var obj1 = {
							"StuId": res.data.data[i].userId,
							"ClassCourseId": item, 
						}
						console.log(obj1);
						console.log('oooooo')
						this.$Api.GetExper(obj1).then(res => {
							if(res.data.success)
							{
								console.log('res.data.success')
								expr = res.data.data.EmpiricalValue
							}
						})
						var obj2 = {
							id: res.data.data[i].account,
							name: res.data.data[i].phone,
							experience: expr
						}
						console.log(obj2);
						this.Students.push(obj2);
					}
				})
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
		created() {
			_this = this
		
		},
		methods: {
			//限时签到
			TimLimitedSignIn() {
				this.timestamp = Math.round(new Date() / 1000);
				this.SignDate = this.$u.timeFormat(this.timestamp, 'yyyy/mm/dd hh:MM:ss');
				this.data.SignDate = this.SignDate;
				this.timestamp = this.timestamp + 60;	// 一分钟限时
				this.EndDate = this.$u.timeFormat(this.timestamp, 'yyyy/mm/dd hh:MM:ss');
				this.data.EndDate = this.EndDate;
				// this.$Api.signIn(this.data).then((res) => {
				// 	if(res.data.success){
				// 		console.log(res.data.msg);
				// 		let item = encodeURIComponent(JSON.stringify(data))
				// 		uni.navigateTo({
				// 			url: "./TimLimitedSignIn?item=" + item
				// 		})
				// 	}
				// })
				let item = encodeURIComponent(JSON.stringify(this.data))
				uni.reLaunch({
					url: "/pages/class/SignIn/TimLimitedSignIn?item=" + item
				})
			},
			Signin() {
				uni.showActionSheet({
				    itemList: ['限时签到', '一键签到', '手工登记'],
				    success: function (res) {
						if(res.tapIndex == 0){
							_this.TimLimitedSignIn();
						}
						else if(res.tapIndex == 1){
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						}
						else {
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
				// uni.navigateTo({
				// 	url: "../SignIn/Signs"
				// })
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

	.img{
		margin-left: 80rpx;
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

	.text{
		margin-left: 550rpx;
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
		color: #1abc9c;
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
	
	.u-body-item-titleu-line-1 {
		margin-top: 10rpx;
		margin-left: 20rpx;
	}
	
	.test {
		height: 50rpx;
		 /* border-radius: 8rpx; */
		/* margin-left: 100rpx; */
	}
	
	.test2 {
		height: -1rpx;
		// border-radius: 8rpx; 
		 margin-left: 400rpx;
	}
	
	.demo-layout {
		height: -1rpx;
		border-radius: 20rpx;
		margin-left: 15rpx;
	}
</style>
