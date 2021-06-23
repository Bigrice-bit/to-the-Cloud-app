<template>
	<view>
		<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> 
			<u-icon name="arrow-left" class="slot-wrap" @click="BackClass"></u-icon>
			</u-navbar>
		</view>
		<view class="list">
			<view class="li " >
				<view class="text">未签到 1人   全选</view>
			</view>
			<swiper-item>
				<scroll-view v-for="(item, index) in Students" :key="index">
					<u-card margin="10rpx" :border="false" :foot-border-top="false" padding="0"
						@tap="Studetail(index)">
						<view class="" slot="body">
			
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<text>{{index}}</text>
								<image
									src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
									mode="aspectFill"></image>
								<view>
									
									<u-row gutter="5">
										<u-col span="6">
											<view class="demo-layout">{{item.name}}
											{{item.id}}</view>
										</u-col>
									</u-row>
									
									
									
								</view>
								<view class="test2">{{item.experience}}经验值</view>
								<u-icon class="test" name="arrow-right" color="rgb(203,203,203)" :size="26">
								</u-icon>
							</view>
						</view>
					</u-card>
				</scroll-view>
			</swiper-item>
			
			</view>
			<view class="list">
			<view class="li " >
				<view class="text">已签到 1人  全选</view>
			</view>
			</view>
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
				Students:[{
					name: 0,
					id: 0,
					experience : 0,
					}
				],
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
	.text{
		padding-left:15upx;
		/* width:100%; */
		color:#000000;
		/* position: flex; */
		/* margin-top: 2; */
		font-style: inherit;
		font-size: large;
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
