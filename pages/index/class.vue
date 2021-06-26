<template>
	<view claas="content">
		<view class="header">
			<u-navbar title-color="#fff" back-icon-color="#ffffff" :is-fixed="isFixed" :is-back="isBack"
				:background="background" :back-text-style="{color: '#fff'}" :back-icon-name="backIconName"
				:back-text="backText" @click="newcreate">
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
			<yomol-prompt :title="promptTitle" :inputType="promptInputType" :maxlength="maxlength"
				:defaultValue="promptDefaultValue" :func="promptFunc" ref="yomolPrompt" @onConfirm="onPromptConfirm">
			</yomol-prompt>
			<view class="big">
				<swiper style="height: 100vh;" :current="curr" @change="setCurr">
					<swiper-item>
						<view v-if="isshow">
							<scroll-view v-for="(item, index) in objectArray" :key="index" v-if="index >= 1">
								<!-- <u-card margin="10rpx" :border="false" :foot-border-top="false" padding="0">
								<view class="" slot="body">

									<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
										<image
											src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
											mode="aspectFill"></image>
										<view>

											<u-row gutter="5" @tap="TeaClassdetail(index)">
												<u-col span="6">
													<view class="demo-layout">{{item.name}}</view>
												</u-col>
												<u-col span="5">
													<view class="test2">{{item.number}}</view>
												</u-col>
											</u-row>
											<u-row gutter="20" justify="space-between">
												<u-col span="8">
													<view class="icontest" @click="signin('signin',index)">
														<u-icon name="phone" label="签到"></u-icon>
													</view>
												</u-col>

											</u-row>

										</view>
										<u-icon class="test" name="arrow-right" color="rgb(203,203,203)" :size="26">
										</u-icon>
									</view>
								</view>
								<u-loadmore :status="status" />
							</u-card> -->
								<u-cell-group>
									<u-cell-item :title=item.coursename :label=item.name arrow-direction="right">

										<u-icon @tap="TeaClassdetail(index)" slot="icon" size="100"
											name="../../static/班课图.png"></u-icon>

										<!-- <u-icon  label="签到" slot="icon" size="30" name="edit-pen"></u-icon> -->
										<view @tap="TeaClassdetail(index)">
											{{item.number}}
										</view>
										<view class="icon" @click="signin('signin',index)">
											<u-icon size="45" name="edit-pen"></u-icon>发起签到
										</view>

									</u-cell-item>

								</u-cell-group>


							</scroll-view>
						</view>
						<scroll-view v-if="!isshow ">
							<image class="img" src="../../static/课程列表为空.png" mode="aspectFit"></image>
							<view class="text">还没有已创建的班课，快去创建一个吧~</view>
							<button class="button" type="" size="mini" shape="circle" :plain="true"
								@click="newcreate">创建班课</button>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view v-for="(item, index) in joinArray" :key="index" v-if="index >= 1">
							<!-- <u-card margin="10rpx" :border="false" :foot-border-top="false" padding="0">

								<view class="" slot="body">

									<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
										<image
											src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
											mode="aspectFill"></image>
										<view>

											<u-row gutter="5" @tap="StuClassdetail(index)">
												<u-col span="6">
													<view class="demo-layout">{{item.name}}</view>
												</u-col>

											</u-row>
											<u-row gutter="20" justify="space-between">
												<u-col span="4">
													<view class="icontest">
														<u-icon name="phone" label="签到"
															@click="Stusignin('signin',index)"></u-icon>
													</view>
												</u-col>

											</u-row>
										</view>
										<u-icon class="test" name="arrow-right" color="rgb(203,203,203)" :size="26">
										</u-icon>
									</view>
								</view>
							</u-card> -->
							<u-cell-group>
								<u-cell-item :title=item.coursename :label=item.name arrow-direction="right"
									@tap="StuClassdetail(index)">

									<u-icon slot="icon" size="100" name="../../static/班课图.png"></u-icon>

									<!-- <u-icon  label="签到" slot="icon" size="30" name="edit-pen"></u-icon> -->
									<view>
										{{item.number}}
									</view>
									<view class="icon" @click="Stusignin('signin',index)">
										<u-icon size="45" name="edit-pen"></u-icon> 签到
									</view>

								</u-cell-item>

							</u-cell-group>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>

		</view>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	import yomolPrompt from '@/components/yomol-prompt.vue'
	var _this
	export default {
		components: {
			yomolPrompt
		},
		data() {
			return {
				curr: 0,
				// title: '',
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
					number: null,
					coursename: null,
				}],
				joinArray: [{
					id: null,
					name: null,
					number: null,
					coursename: null,
				}],
				classnum: '',
				stringArray: ['a', 'b', 'c'],
				creator: 0,
				SignDate: null,
				EndDate: null,
				timestamp: null,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				data: {
					"Creator": "",
					"SignDate": "",
					"EndDate": "",
					"ClassCourseId": null,
					"Duration": null,
					targetLongitude: null,
					targetLatitude: null,
					StuSignType: null
				},
				status: 'loadmore',
				iconType: 'flower',
				page: null,
				limit: 5,
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
				isshow: null,
			}
		},
		onBackPress() {
			if (this.$refs.yomolPrompt.visible) {
				this.$refs.yomolPrompt.hide()
				return true
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
		onLoad(e) {

			const value = uni.getStorageSync("LoginKey");
			if (value) {
				console.log(value);
				this.creator = value;
				this.data.Creator = value;
			}

			// 获取用户信息，判断是否填写姓名和学号工号，没有的话就弹框填写
			this.$Api.UserInfo(this.creator).then(res => {
				if (res.data.success) {
					if (!res.data.data.userName || !res.data.data.userNum) {
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: '请完善个人信息',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateTo({
										url: '/pages/Mine/Person'
									})
								}
							}
						});
					}
				}
			})

			this.$Api.GetAllCreatedClass(this.creator).then(res => {
				console.log(res);
				let serve = res.data.data;
				if (res.data.success) {
					this.isshow = true;
					console.log(serve.length)
					this.page = serve.length
					for (var i = 0; i < serve.length; i++) {
						var obj = {
							id: serve[i].classCourseId,
							name: serve[i].classCourseName,
							number: serve[i].classCourseNum,
							coursename: serve[i].courseName
						}
						console.log(obj);
						this.objectArray.push(obj);
					}
				} else {
					console.log("失败或者无班课")
					this.isshow = false;
				}


			})
			// console.log(this.isshow)
			// console.log("j" + this.objectArray.length)

			// console.log(this.objectArray)
			// if(this.objectArray <= 1)
			// {
			// 	this.isshow = false;
			// }


			this.$Api.GetAllJoinedClass(this.creator).then(res => {
				console.log(res);
				let serve = res.data.data;
				if (res.data.success) {
					console.log(serve.length)
					for (var i = 0; i < serve.length; i++) {
						var obj = {
							id: serve[i].classCourseId,
							name: serve[i].classCourseName,
							number: '',
							coursename: serve[i].courseName
						}
						console.log(obj);
						this.joinArray.push(obj);
					}
				} else {
					console.log("失败或者无班课")
				}
			})
			//自定义input处理事件监听
			uni.$on('update-prompt', (data) => {
				// data.value input输入值
				// data.callback 处理后返回方法名
				let val = data.value
				// ...逻辑处理...

				uni.$emit(e.callback, val)
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
				let obj = {
					id: this.objectArray[index].id,
					classcoursename: this.objectArray[index].coursename
				}
				console.log(encodeURIComponent(JSON.stringify(obj)))
				uni.reLaunch({
					url: '/pages/class/created_class/home?item=' + encodeURIComponent(JSON.stringify(obj))
				})
			},
			//学生班课信息
			StuClassdetail(index) {
				console.log(index)
				console.log(this.joinArray[index].id)
				console.log("跳转学生详情页")
				// let obj={
				// 	id: this.objectArray[index].id,
				// 	classcoursename: this.Join.coursename
				// }
				let obj = {
					id: this.joinArray[index].id,
					classcoursename: this.joinArray[index].coursename
				}
				console.log(encodeURIComponent(JSON.stringify(obj)))
				uni.reLaunch({
					url: '/pages/class/Stu/Detail/home?item=' + encodeURIComponent(JSON.stringify(obj)),
					
				})
			},
			newcreate() {
				console.log(this.curr)
				if (this.curr === 0) //0是创建班课
				{
					if (this.stuOrteach) //true为学生
					{
						uni.showModal({
							title: '提示',
							content: '你没有权限创建',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								}
							}
						});
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
				this.data.ClassCourseId = this.objectArray[index].id;
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
			//老师发起签到
			signin(data, index) {
				if (data == 'signin') {
					this.i = index
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
											console.log("点击确认")
											_this.timestamp = Math.round(new Date() / 1000);
											_this.SignDate = _this.$u.timeFormat(_this.timestamp,
												'yyyy/mm/dd hh:MM:ss');
											_this.data.SignDate = _this.SignDate;
											_this.timestamp = _this.timestamp + 60; // 一分钟限时
											_this.data.Duration = 60
											_this.EndDate = _this.$u.timeFormat(_this.timestamp,
												'yyyy/mm/dd hh:MM:ss');
											_this.data.EndDate = _this.EndDate;
											_this.data.StuSignType = 1;
											_this.data.ClassCourseId = _this.objectArray[index].id;
											uni.getLocation({
												type: 'wgs84',
												success: function(res) {
													console.log('当前位置的经度：' + res
														.longitude);
													console.log('当前位置的纬度：' + res
														.latitude);
													_this.data.targetLongitude = res
														.longitude //经度
													_this.data.targetLatitude = res
														.latitude //纬度
													console.log(_this.data);
													_this.$Api.CreateSign(_this.data)
														.then(res => {
															let item =
																encodeURIComponent(
																	JSON.stringify(
																		res.data
																		.data))
															console.log(res.data
																.data)
															console.log(item)
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
								uni.navigateTo({
									url: "/pages/class/SignIn/ManualReg"
								})
								console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
							}
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '此功能未开发！敬请期待',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			//学生签到
			Stusignin(data, index) {
				console.log("判断老师是否发起签到，是的话进入签到界面，否的话提示未发起签到")
				this.$Api.IsSignIn(this.joinArray[index].id).then(res => {
					console.log(res);
					if (res.data.success) {
						console.log("有签到,根据返回type判断是哪种签到");
						if (res.data.data.stuSignType == 0) {
							let item = encodeURIComponent(JSON.stringify(res.data.data))
							uni.navigateTo({
								url: '/pages/class/Stu/Sign/TimeSignIn?item=' + item
							})
						} else {
							let item = encodeURIComponent(JSON.stringify(res.data.data))
							uni.navigateTo({
								url: '/pages/class/Stu/Sign/OneClick?item=' + item
							})
						}
					}
					// else{
					// 	uni.showModal({
					// 	    title: '提示',
					// 	    content: '老师未发起签到',
					// 	    success: function (res) {
					// 	        if (res.confirm) {
					// 	            console.log('用户点击确定');
					// 	        } 
					// 			// else{
					// 			// 	console.log('用户点击取消');
					// 			// }
					// 	    }
					// 	});
					// }
				})
			},

			// //弹窗
			// 			confirmPop() { //确认
			// 				if(this.contentPop == '88888888') {
			// 					this.contentPop = ''
			// 					this.showPop = false
			// 				} else {
			// 					uni.showToast({
			// 						title: '密码错误！',
			// 						icon: 'none',
			// 						duration: 1000
			// 					})
			// 				}
			// 			},
			// 			cancelPop() {  //取消
			// 				this.contentPop = ''
			// 				this.showPop = false			  
			// 			},

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

			joinclass() {
				let i;
				uni.scanCode({
					scanType: ['QR_CODE'],
					success: function(res) {
						// _this.$Api.SelectCourseById(res.result).then(res => {
						// 	if (res) {
						// 		uni.navigateTo({
						// 			url: '/pages/class/JoinClass/JoinClass?item=' +
						// 				encodeURIComponent(JSON.stringify(res))
						// 			// url: '/pages/class/JoinClass/JoinClass'
						// 		})
						// 	}
						// })
						plus.nativeUI.toast("该班课已结束");
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
						url: '/pages/class/JoinClass/JoinClass?item=' + encodeURIComponent(JSON
							.stringify(res))
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
		margin-left: 200rpx;
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

	.icon {
		// margin-bottom: 0;
		// margin-right: 10;
		position: absolute;
		margin-left: 150rpx;
		margin-bottom: 10upx;
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
		// width: 10rpx;
		flex: 50 20 50rpx;
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

	.text {
		font-size: 20rpx;
		font-style: inherit;
		margin-left: 200rpx;
		margin-top: 0rpx;
		margin-bottom: 100rpx;
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

	.button {
		margin-left: 300rpx;
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
