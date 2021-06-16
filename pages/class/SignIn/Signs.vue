<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" title="签到" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
			<image src="../../../static/限时签到.png" shape="circle" mode="aspectFit" @click="TimLimitedSignIn"></image>
			<image src="../../../static/一键签到.png" shape="circle" mode="aspectFit" @click="OneClickSignIn"></image>
			<image src="../../../static/手工登记.png" shape="circle" mode="aspectFit" @click="ManualRegistration"></image>
		</view>

		<view class="u-demo">
			<text>历史签到记录</text><text></text>
			<view class="u-demo-wrap" style="padding-left:0;padding-right:0;margin-left: -20rpx;margin-right: -5rpx;">
				<view class="u-demo-area">
					<u-cell-item center :is-link="true" value="" index="index" @click="click" 
						title="2021-03-25 星期四 签到" icon="list-dot" :label="label" :border-top="true">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" value="" index="index" @click="click" 
						title="2021-03-25 星期5 签到" icon="list-dot" :label="label">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" value="" index="index" @click="click" 
						title="2021-03-25 星期6 签到" icon="list-dot" :label="label">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" value="" index="index" @click="click" 
						title="2021-03-25 星期7 签到" icon="list-dot" :label="label">
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
				arrow: true,
				keyword: '',
				SignDate: null,
				EndDate:null,
				timestamp: null,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				data:{
					"Creator": "",
					"SignDate": "",
					"EndDate": "",
					"ClassCourseId": 0,
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
			OnCourse() {
				try {
				    const Tvalue = uni.getStorageSync("LoginKey");
					
				    if(Tvalue) {
				        console.log(Tvalue);
						this.data.Creator = Tvalue;
				    }
				} catch(e){
				    console.log(e);
				}
				try {
				const Cvalue = uni.getStorageSync(this.courseName);
				if(Cvalue) {
				        console.log(Cvalue);
						this.data.ClassCourseId = Cvalue;
				    }
				} catch(e){
				    console.log(e);
				}
			},
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
				uni.navigateTo({
					url: "./TimLimitedSignIn?item=" + item
				})
			},
			OneClickSignIn() {
				console.log("一键签到");
			},
			GesturesSignIn() {
				console.log("手势签到");
			},
			ManualRegistration() {
				console.log("手工登记");
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
		font-size: 32rpx;
		color: #333;
		padding: 0rpx 10rpx;
	}

	.u-body-item image {
		width: 150rpx;
		flex: 120 0 120rpx;
		height: 250rpx;
		border-radius: 8rpx;
		margin-left: 10rpx;
		margin-bottom: 100rpx;
		margin-top: 100rpx;
	}
</style>
