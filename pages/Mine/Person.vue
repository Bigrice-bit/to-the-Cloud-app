<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view class="list-content">
			<view class="list">
				<!-- <view class="li " >
					<view class="avator">
						<image class="img" src="../../static/user/face.jpg" mode="widthFix"></image>
					</view>
			
					<view>
						<view class="name">{{info.name}}</view>
						<view class="phone-number">{{info.phone}}</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view> -->
		
				<!-- <view class="list"></view> -->
				
				<u-cell-group class="">
					<u-cell-item center :is-link="true"  i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="姓名" >
					 <u-input class="inputname" placeholder='请输入姓名'	v-model="info.name" type="text" :border="border" />
					</u-cell-item>
					<u-cell-item center :is-link="true"  :value="info.phone" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="手机号" >
					</u-cell-item>
					<u-cell-item center :is-link="true"  :value="info.account" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="账号" >
					</u-cell-item>
					<u-cell-item center :is-link="true"  i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="出生年份" >
					 <u-input class="input" placeholder='请输入年份'	v-model="info.birthday" @click="show=true" type="select" :border="border" :select-open="YearShow" />
					</u-cell-item>
					<u-cell-item center :is-link="true"  value="" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="选择性别" >
					 <u-radio-group :shape="shape" :size="size" :width="width" :wrap="wrap" v-model="info.sex" @change="radioGroupChange" :activeColor="activeColor">
					 	<u-radio @change="radioChangeS" v-for="(item, index) in list" :disabled="item.disabled"
					 		:key="index" :name="item.name"
					 	>{{item.name}}</u-radio>
					 </u-radio-group>
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" :label="info.school" value="" i ndex="index"  :hover-class="hoverClass"
					 :arrow="arrow" title="你所在的学校、院系及专业" >
						<!-- <u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch> -->
						<u-input :border="border" type="select" :select-open="pickerShow" 
							placeholder="" @click="Show"></u-input>
					</u-cell-item>
					<u-cell-item center :is-link="true"  value="" index="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="选择身份" >
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
						<u-radio-group :shape="shape" :size="size" :width="width" :wrap="wrap" v-model="info.iden" @change="radioGroupChange" :activeColor="activeColor">
							<u-radio @change="radioChange" v-for="(item, index) in identity" :disabled="item.disabled"
								:key="index" :name="item.name" v-model="info.iden"
							>{{item.name}}</u-radio>
						</u-radio-group>
					</u-cell-item>
					<u-cell-item center :is-link="true"   index="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="学号/工号" >
					 <u-input class="inputnum" placeholder='请输入学号/工号'	v-model="info.cardnum" :type="type" :border="border" />
					</u-cell-item>
				</u-cell-group>
			<u-select mode="mutil-column-auto" :list="SchoolList" v-model="pickerShow" @confirm="selectSchool"
				>
			</u-select>
			<u-picker mode="time" v-model="show" :params="params"   @confirm="selectYear"></u-picker>
			</view>
		</view>
		<button type="error" class="button" @click="SaveChange">保存</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'用户信息',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				border: false,
				info :
					{
						name: null,
						phone: null,
						birthday: null,
						school: null,
						cardnum: null,
						iden: null,
						account:null,
						sex: null,
						},
				show: false,
				params: {
						year: true,
		
					},
				type: 'number',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				list: [
								{
									name: '男',
									disabled: false
								},
								{
									name: '女',
									disabled: false
								}
							],
				identity:[
								{
									name: '我是老师',
									disabled: false,
									index:0
								},
								{
									name: '我是学生',
									disabled: false,
									
								},
								{
									name: '其他',
									disabled: false,

								}
							],
							// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				disabled: false,
				result: '荔枝',
				shape: 'circle', 
				value: '',
				activeColor: '#2979ff',
				
				size: 34,
				wrap: false,
				width: 'auto',
				icon: 'setting',
				arrow: false,
				label: '后端返回学校等',
				rightSlot: true,
				checked: false,
				pickerShow: false,
				YearShow: false,
				selectShow: false,
				creator: null,
				updateinfo: null,
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
			};
		},
		onLoad() {
			try {
			    const value = uni.getStorageSync("lifeData");
			    if(value) {
			        console.log(value);
					if(value.vuex_jurisdiction.name === '0')
					{
						this.info.iden = '我是老师'
					}
					else if(value.vuex_jurisdiction.name === '1')
					{
						this.info.iden = '我是学生'
					}
					else
					{
						this.info.iden = '其他'
					}
					console.log(this.info.iden)
			    }
			} catch(e){
			    console.log(e);
			}
			this.creator = uni.getStorageSync("LoginKey");
			
			this.$Api.UserInfo(this.creator).then(res => {
				console.log("以下为返回的用户信息")
				console.log(res.data.data)
				if(res.data.success){
					console.log(res)
					this.info.name = res.data.data.userName;
					this.info.phone = res.data.data.phone;
					let time = res.data.data.birthDate;
					this.info.birthday = this.dateFormat(new Date(time), 'yyyy');
					this.$Api.GetCollegeById(res.data.data.collegePointId).then(res => {
						let college = res.data.data
						if(res.data.success){
							this.info.school = college.collegePointName + '-' + college.children.collegePointName+'-'+college.children.children.collegePointName;
						}
					})
					
					this.info.cardnum = res.data.data.userNum;
					this.info.account = res.data.data.account;
					this.info.sex = res.data.data.sex;
					this.updateinfo = res.data.data;
					
				}
			});
				// this.form.term = this.selectList[1].value
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
				
		},
		computed: {
			hoverClass() {
				// 如果右侧是switch步进器组件的话，去掉cell的点击反馈，因为这个时候点击的反馈应该在switch上
				return this.rightSlot == 'switch' ? 'none' : 'u-cell-hover';
			}
		},
		methods: {
			// 选中某个单选框时，由radio时触发
					radioChange(e) {
						
						console.log(e);
						this.info.iden = e;
					},
					radioChangeS(e) {
						
						console.log(e);
						this.info.sex = e;
					},
					// 选中任一radio时，由radio-group触发
					radioGroupChange(e) {
						// console.log(e);
					},
			Person(){
				uni.navigateTo({
						url: './Person'
				});
			},
			click(index) {
				// console.log(index);
			},
			// ChangeSchool(){
			// 	uni.navigateTo({
			// 			url: './selectSchool'
			// 	});
			// },
			selectTerm(e) {
					this.info.birthday = '';
					e.map((val, index) => {
						this.info.birthday += this.info.birthday == '' ? val.label : '-' + val.label;
					})
			},
			Show() {
				this.pickerShow = true;
				console.log(this.SchoolList)
				},
				selectSchool(e) {
					this.info.school = '';
					e.map((val, index) => {
						// if(val.label != null){
						this.info.school += this.info.school == '' ? val.label : '-' + val.label;
						// }
						// else{
						// 	this.info.school += this.info.school;
						// }
						if(val.value != null){
							this.updateinfo.collegePointId = val.value;
							}
						console.log('val.value:');
					})
					console.log(this.updateinfo.CollegePointId);
				},
				selectYear(e) {
					this.info.birthday = '';
					console.log(e)
						this.info.birthday =e.year;
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
			SaveChange(){
			if(this.info.name!=null && this.info.iden!=null && this.info.cardnum!=null)
			{
			console.log(this.info.iden)
					if(this.info.iden === "我是老师")
					{
						this.$u.vuex('vuex_jurisdiction.name','0');
						this.updateinfo.roleIdList = 2;
						this.updateinfo.roleNameList = "教师";
					}
					else if(this.info.iden === "其他"){
						this.$u.vuex('vuex_jurisdiction.name','2');
						this.updateinfo.roleIdList = 3;
						this.updateinfo.roleNameList = "学生"
					}
					else{
						this.$u.vuex('vuex_jurisdiction.name','1');
						this.updateinfo.roleIdList = 3;
						this.updateinfo.roleNameList = "学生"
					}
					
					console.log("保存成功")
					this.updateinfo.userName = this.info.name;
					this.updateinfo.birthDate = this.info.birthday +'/02/01';	//this.info.birthday
					this.updateinfo.sex = this.info.sex;
					// this.updateinfo.stuid
					// this.updateinfo.CollegePointId = null;
					this.updateinfo.userNum = this.info.cardnum;
					// this.updateinfo.birthDate = this.info.birthday
					// conso.log(
					console.log("以下为更新的用户信息")
					console.log(this.updateinfo)
					this.$Api.UpdateInfo(this.updateinfo).then(res => {
			
						if(res.data.success)
						{
							uni.showToast({
							title: '保存成功',
							duration: 1000
							});
							setTimeout(function () {
								
							   uni.reLaunch({
							   	url:'/pages/index/class'
							   })
										   
							                   }, 1000);
							
						}
						else{
							uni.showToast({
							title: 'error',
							duration: 1000
							});
						}
					})
					
						

				}
				else{
					uni.showToast({
					title: '请输入信息',
					duration: 1000
					});

					}
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color:#f1f1f1;
	font-size: 30upx;
}
.header{
	background: #fff;
	height: 390upx;
	padding-bottom: 110upx;
	.bg{
		width: 100%;
		height:200upx;
		padding-top:100upx;
		background-color:#4191ea;
	}
}

.avator {
		width: 200upx;
		height: 200upx;
		overflow: hidden;
		// border-radius: 100rpx;
		// border-style: ridge;
		// border-color: #000000;
	}

	.avator .img {
		width: 100%
	}
	
	.button{
		// margin-top: 100rpx;
		// bottom: var(--window-bottom);
		// position: fixed;  
		bottom: -1000rpx;
	}
	
	.radio{
		
	}
	
.box{
	width: 650upx;
	height: 280upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2); 
	
	.box-hd{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		.avator1{
			width: 150upx;
			height: 150upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;
			
			img{
				width: 50%;
				height: 50%;
				
			}
		}
		
		.name {
			height: 50upx;
			text-align: top;
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
				width: 100upx;
				height: 100upx;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}

	
.input{
	margin-left: 400rpx;
}
.inputname{
	margin-left: 480rpx;
}
.inputnum{
	margin-left: 360rpx;
}
.inputbir{
	margin-left: 350rpx;
}
.list-content{
	background: #fff;
	
	margin-top: 0rpx;

}
.list{
	width:100%;
	height: 150upx;
	border-bottom:50upx solid  #f1f1f1;
	background: #fff;
	&:last-child{
		border: none;
	}
	.li{
		width:100%;
		height:200upx;
		padding:0 4%;
		border-bottom:1px solid rgb(243,243,243);
		display:flex;
		align-items:center;
	&.noborder{
		border-bottom:0
		}
		.to{
			// flex-shrink:0;
			width:40upx;
			height:40upx;
			margin-left: 500rpx;
		}
	}
}
</style>
