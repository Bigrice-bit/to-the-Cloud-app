<template>
			<view>

					<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
						:background="background" :back-text-style="{color: '#fff'}" :title="item.course" :back-icon-name="backIconName"
						:back-text="backText" @click="newcreate"> 
						<u-icon name="arrow-left" class="slot-wrap" @click="BackClass"></u-icon>
						</u-navbar>

				<view class="header">
					<view class="bg">
						
						<view class="box">
							<view class="box-bd">
								<view class="avator">
								<image class="img" src="../../../static/Class.png" mode="aspectFill"></image>
								</view>
								<view class="text1">
									<view>{{item.course}}</view></br>
									<view>{{item.class}}</view></br>
									<view>{{item.term}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-content">

					<view class="list">
						<u-cell-group class="">
							<u-cell-item center :is-link="true"   
							 :arrow="false" title="班课号" :value="item.classCourseNum">
							</u-cell-item>
							<u-cell-item center :is-link="true" 
							 :arrow="false" title="允许加入" >
							 <label class="radio"><radio value="r1" :checked="checked" @click="radio"/></label>
							</u-cell-item>
							
							<u-cell-item center :is-link="true" :label="school" value="" i ndex="index"  
							 :arrow="false" title="学校院系" >
							<u-input :border="border" type="select" :select-open="pickerShow"
								placeholder="" @click="Show" ></u-input>
							</u-cell-item>
							<u-cell-item center :is-link="true"   :arrow="arrow"
							 title="学习要求" label="暂无" @click="Input(0)">
							</u-cell-item>
							<u-cell-item center :is-link="true"  
							  title="教学进度" label="暂无"  @click="Input(1)">
							</u-cell-item>
							<u-cell-item center :is-link="true"  
							 title="考试安排" label="暂无"  @click="Input(2)">
							</u-cell-item>
						</u-cell-group>
							</view>
					<view>
						<u-button class="button" type="warning" @click="EndeClass(1)">结束班课</u-button>
						
						<u-button class="button" type="default" @click="EndeClass(2)">删除班课</u-button>
						<view class="text">只有已结束班课才可删除</view>
					</view>
					<u-select mode="mutil-column-auto" :list="SchoolList" v-model="pickerShow" @confirm="selectSchool"
						>
					</u-select>
		</view>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	var _this
	export default {
		data() {
			return {
				title: '',
				tabbar: '',
				backText: '返回',
				backIconName: 'nav-back',
				right: false,
				showAction: false,
				rightSlot: false,
				isBack: false,
				isFixed: true,
				arrow: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				checked:true,
				classid: null,
				item:{
					course: null,
					class: null,
					term: null,
					classCourseNum: null,
					collegepointid:null,	//学校
					courseId: null,
					isEnd:null,
				},
				updateclass: {
				},
				border: false,
				pickerShow: false,
				school: null,
				SchoolList: [{
					value: null,
					label: '请选择学校',
					children: [{
						value: null,
						label: '请选择学院',
						children: [{
							value: null,
							label: '请选择专业',
						}]
					}]
				}],
				CourseList:[
					{
						value: null,
						label: null,
						id: null,
					}
				],
			}
		},
		created() {
			_this = this
		},
		onLoad() {
			// const value = uni.getStorageSync("ClassKey");
			// if (value) {
			// 	console.log(value);
			// 	this.classid = value;
			// }
			try {
				const Tvalue = uni.getStorageSync("ClassKey");
			
				if (Tvalue) {
					// console.log(Tvalue);
					// this.classid = Tvalue;
					this.$Api.SearchClass(Tvalue).then(res => {
						console.log(res)
						_this.updateclass = res.data.data
						if(res.data.success){
							_this.item.class = res.data.data.classCourseName,
							_this.item.term  = res.data.data.term,
							_this.item.classCourseNum = res.data.data.classCourseNum
							_this.item.course = res.data.data.courseName
							_this.item.isEnd = res.data.data.isEnd
							
							this.$Api.GetCollegeById(res.data.data.collegePointId).then(res => {
								let college = res.data.data
								if(res.data.success){
									if(res.data.data.children.children != null)
									{
									this.school = college.collegePointName + '-' + college.children.collegePointName+'-'+college.children.children.collegePointName;
									}
									else{
										this.school = college.collegePointName + '-' + college.children.collegePointName
									}
								}
							})
							
							if(res.data.data.isAdd == 0)
							{
								_this.checked = true;
							}
							else{
								_this.checked = false;
							}
						}
					})
					// this.$Api.SearchCourse(this.item.courseId).then(res => {
					// 	this.item.course = res.data.data.courseName
					// })
				}
			} catch (e) {
				console.log(e);
			}
			
			
			
			// this.title = this.item.course;
			this.$Api.getCollege().then(res => {
				console.log(res)
				if (res.data.success) {
					// console.log(res.data.success)
					let server = res.data.data;
					// for (var i = 0; i < server.length; i++) {
					// 	var obj1 = {
					// 		label: server[i].collegePoint.collegePointName,
					// 		value: server[i].collegePoint.collegePointId,
					// 	};
					// 	this.SchoolList.push(obj1);
					// 	for (var j = 0; j < server[i].collegePoints.length; j++) {
					// 		var obj2 = {
					// 			label: server[i].collegePoints[j].collegePoint.collegePointName,
					// 			value: server[i].collegePoints[j].collegePoint.collegePointId,
					// 		};
					// 		this.SchoolList[i].children.push(obj2)
					// 		for (var k = 0; k < server[i].collegePoints[j].collegePoints.length; k++) {
					// 			var obj3 = {
					// 				label: server[i].collegePoints[j].collegePoints[k].collegePoint.collegePointName,
					// 				value: server[i].collegePoints[j].collegePoints[k].collegePoint.collegePointId,
					// 			};
					// 			// console.log(obj3);
					// 			this.SchoolList[i].children[j].children.push(obj3)
					// 		}
					// 	}
						
					// }
					for (var i = 0; i < server.length; i++) {
						var obj1 = {
							label: server[i].collegePoint.collegePointName,
							value: server[i].collegePoint.collegePointId,
							children: []
						};
						this.SchoolList.push(obj1);
						}
					for (var i = 0; i < server.length; i++) {
						// console.log(server[i].collegePoints.length)
						for (var j = 0; j < server[i].collegePoints.length; j++) {
							var obj = {
								label: server[i].collegePoints[j].collegePoint.collegePointName,
								value: server[i].collegePoints[j].collegePoint.collegePointId,
								children: []
							};
							// console.log(obj);
							this.SchoolList[i+1].children.push(obj)
						}
						// console.log('2')
						// console.log(this.SchoolList[i].children)
					}
					console.log(server.length)
					for (var i = 0;i < server.length; i++) {
						console.log(server[i].collegePoints.length)
						for (var j = 0; j < server[i].collegePoints.length; j++) {
							// console.log(server[i].collegePoints[j].length)
							for (var k = 0; k < server[i].collegePoints[j].collegePoints.length; k++) {
								var obj = {
									label: server[i].collegePoints[j].collegePoints[k].collegePoint
										.collegePointName,
									value: server[i].collegePoints[j].collegePoints[k].collegePoint
										.collegePointId,
								};
								// console.log(obj);
								this.SchoolList[i+1].children[j].children.push(obj)
							
							}
						}
					}
				} else {
					uni.showToast({
						icon: "none",
						title: '暂无数据'
					})
				}
			})
			
			this.$Api.GetAllCourse().then(res => {
				if(res.data.success){
					console.log(res)
					for(var i = 0;i < res.data.data.length; i++)
					{
					var obj = {
						value: res.data.data[i].courseName,
						label: res.data.data[i].courseName,
						id: res.data.data[i].courseId
					}
						this.CourseList.push(obj)
					}
					console.log(this.CourseList)
				}
			})
			this.tabbar = [{
					iconPath: "file-text",
					selectedIconPath: "file-text",
					text: '签到记录',
					count: 0,
					// isDot: true,
					customIcon: false,
					pagePath: "/pages/class/created_class/message"
				},
				{
					iconPath: "account",
					selectedIconPath: "account",
					text: '班课成员',
					customIcon: false,
					pagePath: "/pages/class/created_class/home"
				},
				{
					iconPath: "chat",
					selectedIconPath: "chat",
					text: '班课详情',
					customIcon: false,
					pagePath: "/pages/class/created_class/detail"
				},
			]
				},
				methods:{
					Show() {
						this.pickerShow = true;
						console.log(this.SchoolList)
						},
						selectSchool(e) {
							this.school = '';
							e.map((val, index) => {
								// if(val.label != null){
								this.school += this.school == '' ? val.label : '-' + val.label;
								
							})
							// console.log(this.updateinfo.CollegePointId);
						},

					Person(){
						uni.navigateTo({
								url: '../Mine/Person'
						});
					},
					safe(){
						uni.navigateTo({
								url: '../safe/index'
						});
					},
					exit(){
						uni.navigateTo({
							url: '/pages/login/login'
						})
					},
					BackClass(){
						uni.reLaunch({
							url: '/pages/index/class'
						})
					},
					EndeClass(index){
						if(index == 1)
						{
							console.log("弹框提醒")
							this.updateclass.isEnd = 1;
							uni.showModal({
								title: '提示',
								content: '是否结束班课？',
								success: function(res) {
									if (res.confirm) {
										console.log(_this.updateclass)
										_this.$Api.UpdateClass(_this.updateclass).then(res => {
											if(res.data.success)
											{
												uni.showToast({
												title: '成功结束班课',
												duration: 1000
												});
												_this.item.isEnd = 1;
												console.log(res);
											}
										})
											}
										else {
										console.log('用户点击取消');
									}
								}
							});
							console.log("结束班课")
							
						}
						else{
							if(this.updateclass.isEnd == 0){
								uni.showModal({
									title: '提示',
									content: '请先结束班课再删除',
									
								});
								}
								else{
									this.$Api.DeleteClass(this.updateclass.classCourseId).then(res => {
										if(res.data.success)
										{
											uni.showModal({
												title: '提示',
												content: '是否删除班课',
												success: function(res) {
													if (res.confirm) {
															
																uni.showToast({
																title: '成功删除班课',
																duration: 1000
																});
																setTimeout(function () {
																	
																   uni.reLaunch({
																               	url: '/pages/index/class',
																               });
																			   
																                   }, 1000);
																console.log(res);
													
															}
														else {
														console.log('用户点击取消');
													}
												}
											});
										}
										else{
											uni.showToast({
											title: '删除失败',
											duration: 1000
											});
										}
									});
								}
							}
					},
					radio(){
						this.checked = !this.checked;
						if(!this.checked)
						{
							console.log("此时不允许加入班课")
							console.log("弹框提醒")
							this.updateclass.isAdd = 1;
							uni.showModal({
								title: '提示',
								content: '不允许学生加入班课',
								success: function(res) {
									if (res.confirm) {
										console.log(_this.updateclass)
										_this.$Api.UpdateClass(_this.updateclass).then(res => {
											if(res.data.success)
											{
												uni.showToast({
												title: '成功关闭班课',
												duration: 1000
												});
												console.log(res);
											}
										})
											}
										else {
										console.log('用户点击取消');
									}
								}
							});
							
							
						}
						else{
							this.updateclass.isAdd = 0;
							this.$Api.UpdateClass(this.updateclass).then(res => {
									if(res.data.success)
									{
										console.log(res.data)
										uni.showToast({
										title: '成功开启班课',
										duration: 1000
										});
									}
								})
								
						}
					},
					input(index){
						if(index == 0)
						{
							console.log("学习要求")
						}
						else if(index == 1)
						{
							console.log("教学进度")
						}
						else{
							console.log("考试安排")
						}
					}
					
				}
			}
</script>

<style lang="scss">>
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
	
	page{
		background-color:#ffffff;
		font-size: 30upx;
	}
	.header{
		background: #fff;
		height: 300upx;
		padding-bottom: 110upx;
		.bg{
			width: 100%;
			height:200upx;
			padding-top:40upx;
			background-color:#1ABC9C;
		}
	}
	.box{
		width: 600upx;
		height: 250upx;
		border-radius: 20upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2); 
		.box-hd{
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			.avator{
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.phone-number{
				width: 100%;
				text-align: center;
			}
		}
		.box-bd{
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;
			.item{
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;
				&:last-child{
					border: none;
				}
				.icon{
					width: 1upx;
					height: 1upx;
					
				}
				// .text{
				// 	width: 100%;
				// 	text-align: center;
				// 	margin-top: 10upx;
				// }
			}
		}
	}
	.list-content{
		background: #fff;
		margin-top: -1rpx;
	}
	
	.slot-wrap {
		display: flex;
		margin-left: 25rpx;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
	
	.list{
		width:100%;
		border-bottom: 5upx solid  #ffffff;
		background: #fff;
		&:last-child{
			border: none;
		}
		.li{
			width:92%;
			height:100upx;
			padding:0 4%;
			border-bottom:1px solid rgb(243,243,243);
			display:flex;
			align-items:center;
		&.noborder{
			border-bottom:0
			}
			.icon{
				flex-shrink:0;
				width:50upx;
				height:50upx;
				image{
					width:50upx;
					height:50upx;
				}
			}
			.text{
				padding-left:20upx;
				margin: -1rpx;
				width:100%;
				color:#666;
			}
			.to{
				flex-shrink:0;
				width:40upx;
				height:40upx;
			}
		}
	}
	
	.button{
		margin-top: 30rpx;
	}
	
	.text{
		color: #a6a6a6;
		padding-right:-1upx;
		// margin: rpx;
		width:100%;

		// margin: 0upx 0;
	}
	
	.avator {
		width: 200upx;
		height: 210upx;
		overflow: hidden;
		border-radius: 10rpx;
		border-style: ridge;
		border-color: #f7f7f7;
		margin-right: 350rpx;
		margin-top: 25rpx;
	}
	
	.avator .img {
		width: 100%;
		height:100%;
	}
	
	.text1{
		position: absolute;
		color: #000000;
		// font-weight: bold;
		font-size: 30rpx;
		// padding-right:100upx;
		margin-left: 40rpx;
		margin-top: 25rpx;
	}
</style>
