<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view class="list-content">
			<view class="list">
			
				<u-cell-group class="">
					<u-cell-item center :is-link="true"  :value="info.phone" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="true" title="手机号" >
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item class="bgcell" center :is-link="true"  :value="info.email" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="true" title="邮箱" >
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<view class="list"></view>
					<u-cell-item center :is-link="true"  value="" i ndex="index" @click="changepwd" :hover-class="hoverClass"
					 :arrow="false" title="修改密码" >
					</u-cell-item>
				</u-cell-group>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'账号安全',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				info:{
					phone:null,
					email: '未关联',
				},
				disabled: false,
				result: '荔枝',
				shape: 'circle', 
				value: '荔枝',
				activeColor: '#2979ff',
				size: 34,
				wrap: false,
				width: 'auto',
				icon: 'setting',
				arrow: true,
				label: '后端返回学校等',
				rightSlot: true,
				checked: false,
			};
		},
		onLoad() {
			const item = uni.getStorageSync('LoginKey')
			this.$Api.UserInfo(item).then(res => {
				if(res.data.success){
					this.info.phone = res.data.data.phone;
					this.info.email = res.data.data.email;
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
			click() {
				uni.showActionSheet({
				    itemList: ['关联邮箱'],
				    success: function (res) {
						uni.navigateTo({
							url: './email'
						})
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			changepwd(){
				console.log("修改密码")
			},
			ChangeSchool(){
				uni.navigateTo({
						url: './selectSchool'
				});
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

.bgcell{

}
.avator {
		width: 150upx;
		height: 150upx;
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
		bottom: -80rpx;
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
			width: 100upx;
			height: 100upx;
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
.list-content{
	background: #fff;
	margin-top: 50rpx;
}
.list{
	width:100%;
	border-bottom:25upx solid  #f1f1f1;
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
