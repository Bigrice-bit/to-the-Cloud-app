<template>
			<view>

					<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
						:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
						:back-text="backText" @click="newcreate"> 
						<u-icon name="arrow-left" class="slot-wrap" @click="BackClass"></u-icon>
						</u-navbar>

				<view class="list-content">

		<u-cell-group v-for="(i, index) in item" :key="index">
			<u-cell-item   title="签到" :label="i.signDate" arrow-direction="right" @click="maureg(index)">
				
				
				<!-- <view>
					{{i.stusignnum}}人/{{i.allstu}}人
				</view> -->
				
			</u-cell-item>
			
		</u-cell-group>
		</view>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	var _this
	export default {
		data() {
			return {
				title: '签到记录',
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
				name:null,
				classnum:null,
				id:null,
				userid:null,
				classcourseid: null,
				item:[],
				info:{},
				
			}
		},
		created() {
			_this = this
		},
		onLoad(option) {
			
			let that = this;
			this.userid = uni.getStorageSync("LoginKey");
			this.classcourseid = uni.getStorageSync("ClassKey");
			
			this.$Api.TeaRecord(this.userid,this.classcourseid).then(async (res) => {
				this.info = res;
				
				// console.log(res)
				if(res.data.success){
					// let time = this.$u.timeFormat(this.timestamp, 'yyyy/mm/dd hh:MM:ss');
					// let t =res.data.data.signDate
					// console.log(t)
					//  this.$Api.GetAllStu(res.data.data[0].classCourseId).then(async (res) => {
					// 	if(res.data.success){
					// 		that.classnum = res.data.data.length
					// 		console.log(that.classnum)
					// 	}
					// })
						// console.log(that.classnum)
						this.item = res.data.data
					for(var i = 0;i < this.item.length;i++){
						this.item[i].signDate = this.dateFormat (new Date(res.data.data[i].signDate), 'yyyy-MM-dd HH:MM:ss');
						// let time2 = this.dateFormat (new Date(res.data.data[i].signDate), '');
					// var obj= {
					// 	date: time1 + '                    '+ '签到',
					// 	time:time2,
					// 	stusignnum: 0,
					// 	allstu: this.classnum,
					// 	startSignId: res.data.data[i].startSignId
					// }
					// this.$Api.SignInfo(res.data.data[i].startSignId).then(res => {
					// 	// console.log(res)
					// 	if(res.data.success){
							
					// 		obj.stusignnum = res.data.data.length
					// 	}
					// })
					
						// console.log(obj)
						// _this.item.push(obj)
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
					pagePath: "/pages/class/created_class/message"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '班课成员',
					customIcon: false,
					pagePath: "/pages/class/created_class/home"
				},
				{
					iconPath: "photo",
					selectedIconPath: "photo-fill",
					text: '班课详情',
					customIcon: false,
					pagePath: "/pages/class/created_class/detail"
				},
			]
				},
				methods:{
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
					BackClass(){
						uni.reLaunch({
							url: '/pages/index/class'
						})
					},
					maureg(index){
						console.log("tiaozhuan")
						console.log(this.item[index].startSignId)
						uni.navigateTo({
							url: '/pages/class/SignIn/ManualReg?item='+encodeURIComponent(JSON.stringify(this.item[index].startSignId))
						})
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
				// margin: -1rpx;
				width:65%;
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
	.detail{
		color: #6fcb7a;
		margin-left: 200rpx;
		font-weight: bold;
		font-size: 50rpx;
	}
	.avator {
		width: 200upx;
		height: 250upx;
		overflow: hidden;
		border-radius: 10rpx;
		border-style: ridge;
		border-color: #f7f7f7;
		margin-right: 220rpx;
	}
	
	.avator .img {
		width: 50%,
	}
	
	.slot-wrap {
		display: flex;
		margin-left: 25rpx;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
	
	.text1{
		color: #000000;
		// font-weight: bold;
		font-size: 30rpx;
		// padding-right:100upx;
		margin-top: 60rpx;
		margin-right: 500rpx;
	}
	
	.text2{
		color: #cccccc;
		// font-weight: bold;
		font-size: 30rpx;

	}
	
	.text3{
		font-size: 20rpx;
		color: #e1e1e1;
	}
	
	.headicon{
		width: 100%;
		height:100%;
		margin-top: 15rpx;
		margin-left: 300rpx ;
	}
</style>
