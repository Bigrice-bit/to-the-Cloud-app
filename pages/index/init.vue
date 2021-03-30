<template>
</template>

<script>
		onLoad(){
			this.loadExecution()
		},
		methods: {
			loadExecution: function(){
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；  先进入首页 之后再根据是否过期判断跳转首页或登录页
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
					// 获取本地存储中launchFlag标识
				    const value = uni.getStorageSync('launchFlag');
				    if (value) {
						console.log(value);
						// launchFlag=true直接跳转到首页
						uni.redirectTo({
							url: '/pages/login/login'
						});
				    } else {
						// launchFlag!=true显示引导页
				        this.guidePages = true
				    }
				} catch(e) { 
					// error 
					uni.setStorage({ 
						key: 'launchFlag', 
						data: true, 
						success: function () {
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
	page,.main{
		width: 100%;
		height: 100%;
	}
</style>
