<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" title="签到中" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
	
	<view>
		<u-cell-group>
				<u-cell-item  :title="SignDate" :arrow="false"></u-cell-item>
				<u-cell-item  :title="EndDate" :arrow="false"></u-cell-item>
			</u-cell-group>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				isFixed: true,
				SignDate: null,
				EndDate:null,
				timestamp: null,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				}
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style>

</style>
