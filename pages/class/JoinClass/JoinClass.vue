<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText"> 
			</u-navbar>
			
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../../static/Class.png" mode="widthFix"></image>
			</view>
			</view>
		<view class="list-content">
					<view class="list">
					</view>
					<u-cell-group class="">
						<u-cell-item center :is-link="true"  :value="value" i ndex="index" @click="click" 
						 :arrow="false" title="老师" >
							<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
							<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
						</u-cell-item>
						<u-cell-item center :is-link="true"  value="学校课表班课" i ndex="index" @click="click" 
						 :arrow="false" title="类型" >
							<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
							<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
						</u-cell-item>
						</u-cell-group>
		</view>
		<u-button shape="circle" :plain="true" type="success" style="margin-top: 200rpx;" @click="joinclass">加入班课</u-button>
			
		</view>
	</view>

</template>

<script>
	export default {

		data() {
			return {
				title: "加入班课",
				isFixed: true,
				isBack: true,
				backText: '返回',
				backIconName: 'nav-back',
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				form: {
					classnum: '',
				},
				labelPosition: 'left',
				errorType: ['message', 'border-bottom'],
				rightSlot: true,
				value: '',
				stuid: null,
				classCourseId: '',
				joinJson: null,
				
				
		}
	},
	onLoad:function(option){//opthin为object类型，会序列化上页面传递的参数
		const item = JSON.parse(decodeURIComponent(option.item));
		console.log("JoinClass");
		console.log(item)
		this.value = item.data.data.classCourseName
		this.classCourseId = item.data.data.classCourseId
	},

	methods: {
		Next(){
			this.$Api.SelectCourseById(this.form.classnum).then(res => {
				console.log(res)
			})
			// console.log("下一步")
		},
		joinclass(){
			try {
				const value = uni.getStorageSync("LoginKey");
				if (value) {
					console.log(value);
					this.stuid = value;
				}
			} catch (e) {
				console.log(e);
			}
			this.joinJson = {
					"stuId": this.stuid,
					"classCourseId": this.classCourseId
				}
			this.$Api.joinClass(this.joinJson).then(res => {
				if(res)
				{
					console.log("加入班课成功")
					uni.showToast({
						title: '加入成功',
						duration: 1000
							});
							setTimeout(function () {
								
							   uni.switchTab({
							   	url: '/pages/index/class'
							   })
							 
										   
							                   }, 1000);
							
						}
					
				
			
			})
			}
		}
	
	};
</script>

<style>
	.content {
		background: #ffffff;
		width: 100vw;
		height: 100vh;
	}
	
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}
	
	.right-item {
		margin: 0 10rpx;
		position: relative;
		color: #000000;
		display: flex;
	}
	
	.avatorWrapper {
		height: 25vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	
	.avator {
		width: 200upx;
		height: 200upx;
		overflow: hidden;
		border-radius: 100rpx;
		border-style: ridge;
		border-color: #000000;
	}
	
	.avator .img {
		width: 100%
	}
	
	
	.form {
		padding: 100 200upx;
		margin-top: 100px;
	}
	
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.avator .img {
		width: 100%
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
			background-color:#1ABC9C;
		}
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
					width: 60upx;
					height: 60upx;
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
	.list-content{
		background: #fff;
	}
	.list{
		width:100%;
		border-bottom:15upx solid  #ffffff;
		background: #fff;
		&:last-child{
			border: none;
		}
		.li{
			width:92%;
			height:100upx;
			padding:0 4%;
			border-bottom:10px solid rgb(243,243,243);
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
</style>
