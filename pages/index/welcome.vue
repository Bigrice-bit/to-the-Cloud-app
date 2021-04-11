<template>
	<view class="main">
		<code-elf-guide v-if="guidePages"></code-elf-guide>
	</view>
	<!-- 	<view class="wrap">
			<u-swiper :list="list"></u-swiper>
		</view> -->
</template>

<script>
	import codeElfGuide from '@/components/code-elf-guide/code-elf-guide.vue'
	export default {
		components: {
			codeElfGuide
		},
		data() {
			return {
				guidePages: true,
				list: [
					'../../static/1.png',
					'../../static/2.png',
					'../../static/3.png',
					'../../static/3.png'
				]
			}
		},
		onLoad() {
			// var _me = this;           
			// uni.getSystemInfo({//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
			// 	success: function(res) {                    
			// 	console.log(res.model);                    
			// 	console.log(res.pixelRatio);                    
			// 	console.log(res.windowWidth);                    
			// 	console.log("高度值"+res.windowHeight);//这里是手机屏幕高度                    
			// 	console.log(res.language);                   
			// 	console.log(res.version);                    
			// 	console.log(res.platform);                    
			// 	_me.windowHeight = res.windowHeight + 'px';                    
			// 	console.log('手机屏幕高度为' + _me.windowHeight);               
			// 			}            
			// });        
			this.loadExecution()
		},
		methods: {
			loadExecution: function() {
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；  先进入首页 之后再根据是否过期判断跳转首页或登录页
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
					// 获取本地存储中launchFlag标识
					const value = uni.getStorageSync('launchFlag');
					if (value) {
						// console.log(value);
						// // launchFlag=true直接跳转到首页
						// uni.redirectTo({
						// 	url: '/pages/login/login'
						// });
						//   } else {
						// launchFlag!=true显示引导页
						this.guidePages = true
					}
				} catch (e) {
					// error 
					uni.setStorage({
						key: 'launchFlag',
						data: true,
						success: function() {
							console.log('error时存储launchFlag');
						}
					});
					this.guidePages = true
				}
				return;
				// uni.switchTab({
				//     url: '/pages/tabBar/component/component'
				// });
			}
		}
	}
</script>

<style>
	page,
	.main {
		width: 100%;
		height: 100%;
	}
</style>
