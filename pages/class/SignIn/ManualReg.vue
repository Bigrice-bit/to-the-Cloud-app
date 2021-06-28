<template>
	<view>
		<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> 
			<u-icon name="arrow-left" class="slot-wrap" @click="BackClass"></u-icon>
			</u-navbar>
		</view>
		
			<view class="bgcolor">
				<view class="text">未签到</view>
				</view>
			<u-cell-group v-for="(i, index) in UnsignStu" :key="index">
				<u-cell-item   :title="i.name" :label="i.num"  :arrow="false" v-if="index >= 1">
					<u-icon slot="icon" size="100" name="../../../static/headimage.png"></u-icon>
			
					
				</u-cell-item>
				
			</u-cell-group>
			
		
			<view class="bgcolor">
				<view class="text">已签到</view>
				</view>
				<u-cell-group v-for="(i, index) in signStu" :key="index">
					<u-cell-item   :title="i.name" :label="i.num"  :arrow="false" v-if="index >= 1">
						<u-icon slot="icon" size="100" name="../../../static/headimage.png"></u-icon>
				
						
					</u-cell-item>
					
				</u-cell-group>
			</view>
	</view>
</template>

<script>
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
				UnsignStu:{
					name:null,
					num:null,
				},
				signStu:{
					name:null,
					num:null,
				},
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				label: '此处显示学号，后台返回',
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
</style>
