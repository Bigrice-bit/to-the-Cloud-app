<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate">
			<u-icon name="arrow-left" class="slot-wrap" @click="BackClass"></u-icon>
		</u-navbar>
		<view class="bgcolor">
			</br>
			<!-- <image class="img" src="../../../../static/签到图标.png" shape="circle" mode="widthFix" @click="Signin"></image> -->
			<view class="text1">第 {{paiming}} 名</view>
			<view class="expr">当前获得{{cord}}经验值</view>
		</view>
		<view class="">
			</br>
			<text>成员总数</text><text class="text">{{stunum}}人</text>
			<view class="u-demo-wrap" style="padding-left:0;padding-right:0;margin-left: -20rpx;margin-right: -5rpx;">
				<view class="u-demo-area">

					<swiper-item>
						<scroll-view v-for="(item, index) in Students" :key="index">
							<!-- <scroll-view> -->
							<u-cell-group>

								<view class="index">{{index+1}}</view>
								<u-cell-item @tap="Studetail(index)" :title=item.name :label=item.id
									arrow-direction="right">


									<u-icon @tap="Studetail(index)" slot="icon" size="100" class="icon"
										name="../../../../static/headimage.png"></u-icon>

									<!-- <u-icon  label="签到" slot="icon" size="30" name="edit-pen"></u-icon> -->
									<view class="test2">{{item.experience}}经验值</view>

								</u-cell-item>

							</u-cell-group>
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
				title: '课程名称',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				useSlot: false,
				tabbar: '',
				isBack: false,
				search: false,
				custom: false,
				isFixed: true,
				arrow: true,
				keyword: '',
				stunum: null,
				SignDate: null,
				EndDate: null,
				data: {
					"Creator": "",
					"Duration": 60,
					"SignDate": "",
					"EndDate": "",
					"ClassCourseId": null,
					StuSignType: null
				},
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				label: '此处显示学号，后台返回',
				Students: [],
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				promptTitle: '提示',
				promptDefaultValue: '',
				promptInputType: 'text',
				promptFunc: "", //空值不执行
				maxlength: 18,

				time: null,
				i: null,
				obj2: {
					id: null,
					name: null,
					experience: null,
					StuId: null,
				},
				paiming: '',
				cord: '',
				ishow:false,
			}
		},
		onLoad: function(option) { //opthin为object类型，会序列化上页面传递的参数
			// console.log(option.item)

			const item = JSON.parse(decodeURIComponent(option.item));
			this.data.ClassCourseId = item.id;
			this.title = item.classcoursename;
			// console.log(this.title)
			console.log(item.id)
			// console.log(this.data.ClassCourseId)
			uni.setStorage({
				key: 'ClassKey',
				data: item.id,
				success: function() {
					setTimeout(function() {
						console.log("存储成功")
					}, 1000);

				}
			})
			try {
				const Tvalue = uni.getStorageSync("LoginKey");

				if (Tvalue) {
					// console.log(Tvalue);
					this.data.Creator = Tvalue;
				}
			} catch (e) {
				console.log(e);
			}
			this.$Api.GetAllStu(this.data.ClassCourseId).then(async(res) => {
				if (res.data.success) {
					this.stunum = res.data.data.length;
					for (var i = 0; i < res.data.data.length; i++) {
						var obj = {
							id: res.data.data[i].userNum,
							StuId: res.data.data[i].userId,
							name: res.data.data[i].userName,
							experience: res.data.data[i].empiricalValue,
						}
						_this.Students.push(obj);
						if (_this.data.Creator == obj.StuId) {
							_this.cord = obj.experience
						}

					}
					_this.paiming = _this.Students.length;
					for (var i = 0; i < _this.Students.length; i++) {
						if (_this.Students[i].experience <= _this.cord) {
							// console.log('paiming',this.paiming)
							_this.paiming--;
						}
						// console.log("排名")
						// console.log(this.paiming)
					}
					_this.paiming++;
					_this.Students.sort(_this.compare('experience'))
					_this.Students.reverse()
					
				}
			})
			// this.Students.reverse() 
			// console.log('this.Students.reverse() ', )
			



			// console.log(item)
			// let T = parsent(this.data.ClassCourseId)
			// console.log(option.item.id)


			// this.$Api.GetAllStu(item.id).then(async (res) => {
			// 	console.log(res)
			// 	this.stunum = res.data.data.length;
			// 	console.log(this.stunum)
			// 	for (var i = 0; i < this.stunum; i++) {
			// 		console.log("从头")
			// 		// _this.expr = 5;
			// 		var obj1 = {
			// 			'StuId': res.data.data[i].userId,
			// 			'ClassCourseId': item.id,
			// 		}
			// 		var obj2 = {
			// 			'id': res.data.data[i].userNum,
			// 			'StuId': res.data.data[i].userId,
			// 			'name': res.data.data[i].userName,
			// 			'experience': 0,
			// 		}
			// 		_this.doGet(obj1)
			// 		// console.log(obj1);
			// 		// console.log('↑obj')



			// 		// _this.$Api.GetExper(obj1).then(async (res) => {
			// 		// 	console.log('GetExper', "res")
			// 		// 	console.log(res)
			// 		// 	if (res.data.success) {
			// 		// 		// console.log('res.data.success')
			// 		// 		// console.log(res)
			// 		// 		if (res.data.data.empiricalValue != null) {
			// 		// 			obj2.experience = res.data.data.empiricalValue
			// 		// 		} else {
			// 		// 			obj2.experience = 0
			// 		// 		}
			// 		// 		console.log(obj2.experience)


			// 		// 		_this.Students.push(obj2);
			// 		// 	} else {
			// 		// 		console.log("res失败")
			// 		// 	}
			// 		// })

			// 		// console.log(this.obj2);

			// 	}


			// 	console.log("学生数组197")
			// 	console.log(this.Students)
			// 	for (var i = 1; i <= this.stunum; i++) {

			// 		console.log('Creator', this.data.Creator)

			// 		if (this.data.Creator == this.Students[i].StuId) {
			// 			console.log(this.Students[i])
			// 			this.cord = this.Students[i].experience;

			// 			console.log("当前用户登录经验值209")
			// 			console.log('experience', this.Students[i].experience)

			// 			break;
			// 		}
			// 	}

			// 	for (var i = 1; i <= this.stunum; i++) {

			// 		this.paiming = this.stunum;
			// 		console.log("111111111111111")

			// 		console.log(this.cord)
			// 		if (this.Students[i].experience < this.cord) {
			// 			console.log("排名")
			// 			this.paiming--;
			// 		}
			// 		// console.log("排名")
			// 		// console.log(this.paiming)
			// 	}
			// })
			// console.log("111")
			// console.log(this.stunum)

			//自定义input处理事件监听
			uni.$on('update-prompt', (data) => {
				// data.value input输入值
				// data.callback 处理后返回方法名
				let val = data.value
				// ...逻辑处理...

				uni.$emit(e.callback, val)
			})

			this.tabbar = [{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '签到记录',
					count: 0,
					// isDot: true,
					customIcon: false,
					pagePath: "/pages/class/Stu/Detail/record"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '班课成员',
					customIcon: false,
					pagePath: "/pages/class/Stu/Detail/home"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '班课详情',
					customIcon: false,
					pagePath: "/pages/class/Stu/Detail/detail"
				},
			]
			console.log("学生列表")
			console.log(this.Students)
		},


		onBackPress() {
			if (this.$refs.yomolPrompt.visible) {
				this.$refs.yomolPrompt.hide()
				return true
			}
		},
		onShow() {
			console.log('paiming',this.Students.length)
			// this.paiming = this.Students.length;
			// for (var i = 0; i < this.Students.length; i++) {
			
				
			
			// 	if (this.Students[i].experience < this.cord) {
			// 		// console.log('paiming',this.paiming)
			// 		this.paiming--;
			// 	}
			// 	// console.log("排名")
			// 	// console.log(this.paiming)
			// }
		},
		created() {
			_this = this

		},
		methods: {
			compare(property){
			return function(a,b){
			var value1 = a[property];
			var value2 = b[property];
			return value1 - value2;
			}
			},
			//限时签到
			TimLimitedSignIn(index) {

				let T = parseInt(this.time)
				this.timestamp = Math.round(new Date() / 1000);
				this.SignDate = this.$u.timeFormat(this.timestamp, 'yyyy/mm/dd hh:MM:ss');
				this.data.SignDate = this.SignDate;
				this.data.Duration = T * 60;
				this.timestamp = this.timestamp + this.data.Duration; // 限时
				this.EndDate = this.$u.timeFormat(this.timestamp, 'yyyy/mm/dd hh:MM:ss');
				this.data.EndDate = this.EndDate;
				this.data.StuSignType = 0;

				console.log(this.data)
				this.$Api.CreateSign(this.data).then(res => {
					let item = encodeURIComponent(JSON.stringify(res.data.data))
					console.log(res.data.data)
					console.log(item)
					uni.reLaunch({
						url: "/pages/class/SignIn/TimLimitedSignIn?item=" + item
					})
				})

			},
			BackClass() {
				uni.reLaunch({
					url: '/pages/index/class'
				})
			},
			//老师发起
			Signin() {
				uni.showActionSheet({
					itemList: ['限时签到', '一键签到', '手工登记'],
					success: function(res) {
						if (res.tapIndex == 0) {
							_this.onOpenPromptClick()
						} else if (res.tapIndex == 1) {
							uni.showModal({
								title: '提示',
								content: '一键签到马上开始！请让学生做好准备',
								success: function(res) {
									if (res.confirm) {
										_this.timestamp = Math.round(
											new Date() / 1000);
										_this.SignDate = _this.$u.timeFormat(
											_this.timestamp,
											'yyyy/mm/dd hh:MM:ss');
										_this.data.SignDate = _this.SignDate;
										_this.timestamp = _this.timestamp +
											60; // 一分钟限时
										_this.data.Duration = 60
										_this.EndDate = _this.$u.timeFormat(
											_this.timestamp,
											'yyyy/mm/dd hh:MM:ss');
										_this.data.EndDate = _this.EndDate;
										_this.data.StuSignType = 1;
										_this.data.ClassCourseId = _this.data
											.ClassCourseId;
										uni.getLocation({
											type: 'wgs84',
											success: function(res) {
												console.log(
													'当前位置的经度：' +
													res
													.longitude);
												console.log(
													'当前位置的纬度：' +
													res
													.latitude);
												_this.data
													.targetLongitude =
													res
													.longitude //经度
												_this.data
													.targetLatitude =
													res
													.latitude //纬度
												console.log(_this
													.data);
												_this.$Api
													.CreateSign(
														_this.data)
													.then(res => {
														let item =
															encodeURIComponent(
																JSON
																.stringify(
																	res
																	.data
																	.data
																)
															)
														console
															.log(
																res
																.data
																.data
															)
														console
															.log(
																item
															)
														uni.reLaunch({
															url: "/pages/class/SignIn/OneClickSignin?item=" +
																item
														})

													});
											}
											// if(res.data.success)
											// {
											// 	uni.navigateTo({
											// 		url:"/pages/class/SignIn/OneClickSignin"
											// 	})
											// }
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						} else {
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
				// uni.navigateTo({
				// 	url: "../SignIn/Signs"
				// })
			},
			BackClass() {
				console.log("点击返回")
				uni.switchTab({
					url: '/pages/index/class'
				})
			},
			Query() {
				console.log("点击按学号（");
				this.SortArray(this.Students);
				console.log(this.Students);


			},
			Studetail(index) {
				console.log("点击进入学生详情页");
				console.log(this.Students[index].StuId)
				uni.navigateTo({
					url: '/pages/class/Stu/Studetail?item=' + encodeURIComponent(JSON
						.stringify(this.Students[
							index].StuId))
				})

			},
			//数组排序方法
			SortArray(data) {
				for (var i = 0; i < data.length; i++) {
					let num = {};
					for (var j = i + 1; j < data.length; j++) {
						if (data[i].id > data[j].id) {
							num = data[j];
							data[j] = data[i];
							data[i] = num;
						}
					}
				}

			},
			/*
			 * 打开提示框
			 */
			onOpenPromptClick() {
				this.promptTitle = '选择限时签到时长' //提示名称
				this.promptDefaultValue = '1分钟' //默认值
				// this.promptInputType = 'text' //输入类型 同Input组件
				// this.maxlength = 18 //最大长度
				this.promptFunc = "update-prompt" //将定义好的处理逻辑名传给组件回调
				this.$refs.yomolPrompt.show()
			},
			/* 
			 * 输入内容
			 */
			onPromptConfirm(e) {
				// console.log("Eee")
				console.log(e);
				this.time = e;
				let T = parseInt(this.time);
				console.log(T)
				console.log(this.i)
				this.TimLimitedSignIn(this.i);
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

	.bgcolor {
		background-color: #1abc9c;
		width: 1000rpx;
		height: 200rpx;
	}

	.text-area {
		/* display: flex; */
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.img {
		margin-left: 300rpx;
		width: 20%;
		height: 20%;
		margin-top: 40rpx;
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

	.text {
		margin-left: 550rpx;
	}

	.text1 {
		/* display: flex; */
		/* justify-content: center; */
		margin-top: 2rpx;
		margin-left: 300rpx;
		font-size: 50rpx;
		font-weight: bold;
		color: #ffffff;
	}

	.expr {
		margin-top: 10rpx;
		margin-left: 260rpx;
		font-size: 30rpx;
		/* font-weight: bold; */
		color: #ffffff;
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
		margin-top: 50upx;
	}


	.slot-wrap {
		display: flex;
		margin-left: 25rpx;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
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
		/* height: -1rpx; */
		/* border-radius: 8rpx; */
		/* margin-left: 170rpx; */
		/* margin-top: -1rpx; */
		color: #f8b764;
	}

	.demo-layout {
		height: -1rpx;
		border-radius: 20rpx;
		margin-left: 15rpx;
	}

	.index {
		/* margin-right: rpx; */
		font-size: 40rpx;
		margin-left: 25rpx;
		/* margin-top: -1rpx; */

	}

	.icon {
		margin-left: 30rpx;
	}

	.slot-wrap {
		display: flex;
		margin-left: 25rpx;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
</style>
