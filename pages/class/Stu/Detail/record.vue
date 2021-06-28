<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate">
		</u-navbar>
		<view>
			<view class="text1" @click="SignIn">参与签到</view>
		</view>
		<view class="bgcolor">
			<view class="text">历史签到记录</view>
			</view>
		<u-cell-group v-for="(i, index) in item" :key="index">
			<u-cell-item   :title="i.date" :label="i.time"  :arrow="false" :value="i.signStatus" v-if="index >= 1">
				
		
				
			</u-cell-item>
			
		</u-cell-group>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	var _this
	export default {

		data() {
			return {
				title: '签到记录',
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
					StuSignType:null
				},
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				label: '此处显示学号，后台返回',
				Students: [{
					name: null,
					id: null,
					experience: null,
				}],
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
				obj2:{
					id:null,
					name:null,
					experience:null,
					StuId: null,
				},
				info:{},
				item:[{
					date:null,
					time:null,
					signStatus:null
				}],
			}
		},
		onLoad: function(option) { //opthin为object类型，会序列化上页面传递的参数
			let that = this;
			this.userid = uni.getStorageSync("LoginKey");
			this.classcourseid = uni.getStorageSync("ClassKey");
			
			this.$Api.StuRecord(this.userid,this.classcourseid).then(async (res) => {
				this.info = res
				console.log(res)
				if(res.data.success){
					for(var i = 0;i < res.data.data.length;i++){
					let time1 = this.dateFormat (new Date(res.data.data[i].signDate), 'yyyy-MM-dd');
					let time2 = this.dateFormat (new Date(res.data.data[i].signDate), 'HH:MM');
					var obj= {
						date: time1,
						time:time2,
						signStatus:res.data.data[i].signStatus,
					}
					
					
						console.log(obj)
						_this.item.push(obj)
					// console.log(time)
					}
				}
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
		created() {
			_this = this

		},
		methods: {
			SignIn(){
				//学生签到
				try {
					const Tvalue = uni.getStorageSync("ClassKey");
						
					if (Tvalue) {
						console.log("判断老师是否发起签到，是的话进入签到界面，否的话提示未发起签到")
						this.$Api.IsSignIn(Tvalue).then(res => {
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
					}
				} catch (e) {
					console.log(e);
				}
					
				},
			dateFormat (time, format) {
			  var t = new Date(time)
			  var tf = function (i) {
			    return (i < 10 ? '0' : '') + i
			  }
			  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
			    switch (a) {
			      case 'yyyy':
			        return tf(t.getFullYear())
			      // break
			      case 'MM':
			        return tf(t.getMonth() + 1)
			      // break
			      case 'mm':
			        return tf(t.getMinutes())
			      // break
			      case 'dd':
			        return tf(t.getDate())
			      // break
			      case 'HH':
			        return tf(t.getHours())
			      // break
			      case 'ss':
			        return tf(t.getSeconds())
			      // break
			    }
			  })
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
					url: '/pages/class/Stu/Studetail?item='+encodeURIComponent(JSON.stringify(this.Students[index].StuId))
				})
				
			},
			//数组排序方法
			 SortArray(data){
			       for(var i=0;i<data.length;i++){
			         let num = {};
			          for(var j=i+1;j<data.length;j++){
			                 if(data[i].id>data[j].id){
			                      num=data[j];
			                      data[j]=data[i];
			                      data[i]=num;
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
	
	.bgcolor{
		background-color: #e9e9e9;
		height: 45rpx;
	}
	.text {
		margin-left: 0rpx;
		/* /margin-top: rpx; */
	}
	.text1 {
		/* display: flex; */
		/* justify-content: center; */
		margin-top: 20rpx;
		margin-left: 327rpx;
		font-size: 30rpx;
		color: #2fd34a;
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
	
	.index{
		/* margin-right: rpx; */
		font-size: 40rpx;
		margin-left: 25rpx;
		/* margin-top: -1rpx; */
		
	}
	
	.icon{
		margin-left: 30rpx;
	}
</style>
