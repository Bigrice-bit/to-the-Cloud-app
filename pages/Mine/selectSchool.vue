<template>
	<view>
	<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
		:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
		:back-text="backText"> 
		<view class="navbar-right" slot="right">
			<view class="item-right" @click="next">继续</view>
		</view>
		</u-navbar>
		
	<u-index-list :scrollTop="scrollTop" :index-list="indexList">
		<view v-for="(item, index) in list" :key="index" @click="click(item)">
			<u-index-anchor :index="item.letter" />
			<view class="list-cell u-border-bottom" v-for="(item1, index) in item.data" :key="index" @click="click(item1)">
				{{item1.name}}
			</view>
		</view>
	</u-index-list>
	</view>
</template>

<script>
	import indexList from "@/js_sdk/index.list.js";
	const letterArr = indexList.list.map(val => {
		return val.letter;
	})
	export default {
		data() {
			return {
				title:'选择学校',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				scrollTop: 0,
				indexList: letterArr,
				list: indexList.list
			}
		},
		methods: {
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		next(){
			
		},
		click(index){
			console.log(index);
		}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: $u-content-color;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
	
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
		color: #19BE6B;
	}
	
</style>
