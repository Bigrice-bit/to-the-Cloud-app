<template>
	<view>
	<u-navbar title-color="#fff" back-icon-color="#ffffff"
		:is-fixed="isFixed" :is-back="isBack" 
		:background="background" 
		:back-text-style="{color: '#fff'}" :title="title" 
		:back-icon-name="backIconName" :back-text="backText"
		@click="newcreate"
	>
	</u-navbar>
	<image class="swiper-item-img" src="../../static/success.png" mode="widthFix"></image>
	<button class="sss" type="default">返回</button></view>
</template>

<script>
	export default{
		data(){
			return{
			title: '创建成功',
			backText: '返回',
			backIconName: 'nav-back',
			right: false,
			showAction: false,
			rightSlot: false,
			useSlot: false,
			background: {
				'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			},
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
			checked: false
			}
		}
	}
</script>

<style>
	.swiper-item-img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	},
	.sss{
		position: absolute;
		height: 80upx;
		line-height: 80upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 35upx;
		color: #454343;
		border: 1px solid #454343;
		z-index: 999;
	}
</style>
