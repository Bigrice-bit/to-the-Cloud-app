<template>
	<view>
		<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" > 
			<u-icon name="arrow-left" class="slot-wrap" @click="BackClass"></u-icon>
			</u-navbar>
		</view>
		
				<view>
				<u-cell-group >
					<u-cell-item  bg-color="#f2f2f2" title="未签到" :arrow="false"></u-cell-item>
					</u-cell-group></view>
			
			<view>
			<u-cell-group v-for="(i, index) in UnsignStu" :key="index">
				<u-cell-item   :title="i.name" :label="i.num"   :arrow="false" v-if="index >= 1" @click="ChangeStatus(index)">
					<u-icon slot="icon" size="100" name="../../../static/headimage.png"></u-icon>
					
					
				</u-cell-item>
				
			</u-cell-group>
			</view>
		
			<view>
			<u-cell-group >
				<u-cell-item bg-color="#f2f2f2"  title="已签到" :arrow="false"></u-cell-item>
				</u-cell-group>
				
				<u-cell-group v-for="(i, index) in signStu" :key="index">
					<u-cell-item   :title="i.name" :label="i.num"  :arrow="false" v-if="index >= 1">
						<u-icon slot="icon" size="100" name="../../../static/headimage.png"></u-icon>
				
						
					</u-cell-item>
				
				</u-cell-group>	
				</view>
			</view>
	</view>
</template>

<script>
	var _this
	export default {
		
		data() {
			return {
				title: '手工登记',
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
				UnsignStu:[{
					id:null,
					name:null,
					num:null,
				}],
				signStu:[{
					id:null,
					name:null,
					num:null,
				}],
				Students:{},
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				startSignId:null,
				classkey:null,
				creator:null,
				}
				},
				created(){
					_this = this
				},
				onLoad(option) {
					// console.log(option.item)
					this.startSignId = option.item;
					// console.log(this.startSignId)
					this.$Api.SignInfo(this.startSignId).then(async (res) => {
						console.log("SignInfo")
						console.log(res)
						if(res.data.success){
							console.log(res.data.data)
							for(var i = 0;i < res.data.data.length;i++)
							{
									_this.$Api.UserInfo(res.data.data[i].stuId).then(async (res) => {
										if(res.data.success)
										{
											var obj  = {
												name: res.data.data.userName,
												num: res.data.data.userNum
											}
											_this.signStu.push(obj)
										}
									})
							}
							}
						})
						// console.log(this.signStu)
						this.classkey = uni.getStorageSync("ClassKey");
						this.creator = uni.getStorageSync("LoginKey");
						this.$Api.GetAllStu(this.classkey).then(res => {
							// console.log("GetAllStu")
						// /	console.log(res)
							if(res.data.success){
								this.Students = res.data.data;
								// console.log("this.Students")
								}
						})
						console.log(this.Students.length);
						for(var i = 0;i < this.Students.length;i++){
								let temp = false;
								console.log('this.signStu.length')
								console.log(this.signStu[0])
								// _this.signStu.splice(0,1)
								for(var j = 0;j < this.signStu.length;j++){
									// console.log('that.signStu[j]')
									// console.log(that.signStu[j])
									if(this.Students[i].userNum == this.signStu[j].num)
									{
										 temp = true;
										 console.log('temp');
										 console.log(temp);
									}
								}
								console.log(temp);
								if(!temp){
									// console.log("11111111111111")
									var obj  = {
										id: this.Students[i].userId,
										name: this.Students[i].userName,
										num: this.Students[i].userNum
									}
									this.UnsignStu.push(obj)
									
								}
								
							}
						
						
									
				},
				methods:
				{
					BackClass() {
						console.log("点击返回")
						uni.reLaunch({
							url: "/pages/class/created_class/message"
						})
					},
					ChangeStatus(index){
						console.log(index)
						uni.showActionSheet({
						    itemList: ['设为缺勤', '设为已签到', '取消'],
						    success: function (res) {
								if(res.tapIndex == 0)
								{
									
								}
								else if(res.tapIndex == 1)
								{
									console.log(_this.UnsignStu)
									let data = {
										StartSignId: _this.startSignId,
										StuId: _this.UnsignStu[index].id,
										ClassCourseId: _this.classkey,
										SignStatus:"已签到"
									}
									// console.log(data)
									
									_this.$Api.UpdateStuStatus(data).then(res => {
										console.log(res)
									})
								}
								else {
									
								}
						    },
						    fail: function (res) {
						        console.log(res.errMsg);
						    }
						});
					}
				}
		}
</script>

<style>
	.list{
		width:100%;
		border-bottom:100upx solid  #ffffff;
		background:  #f2f2f2;
		height:180rpx;
		&:last-child{
			border: none;
		}
		.li{
			width:200%;
			height:200upx;
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
				padding-left:30upx;
				width:100%;
				color:#666;
				position: flex;
				margin: center;
				font-size: 15;
			}
			.to{
				flex-shrink:0;
				width:40upx;
				height:40upx;
			}
		}
	}
	.bgcolor{
		background-color: #e9e9e9;
		height: 45rpx;
	}
	.text {
		margin-left: 0rpx;
		/* /margin-top: rpx; */
	}
	
	.u-body-item {
		font-size: 30rpx;
		color: #333;
		padding: 0rpx 10rpx;
	}
	
	.u-body-item image {
		width: 50rpx;
		flex: 50 0 50rpx;
		height: 150rpx;
		border-radius: 8rpx;
		margin-left: 10rpx;
	}
	
	.u-body-item-titleu-line-1 {
		margin-top: 10rpx;
		margin-left: 20rpx;
	}
	
	.u-cell-item{
		height: 100rpx;
		color:#000000;
		background-color: #000000;
		title-width:100rpx;
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
