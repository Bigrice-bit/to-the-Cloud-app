<template>
	<view class="content">
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText"> 
			<view class="navbar-right" slot="right">
				<view class="message-box right-item">
					<text @click="Next">下一步</text>
				</view>
			</view>
			</u-navbar>
			
		<view class="form">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<u-form-item :label-position="labelPosition" label="" prop="team" label-width="150" >
					<u-input type="number" v-model="form.classnum" placeholder="请输入班课号" />
				</u-form-item>
			</u-form>
		</view>
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
				
				
		}
	},
	methods: {
		Next(){
			this.$Api.SelectCourseById(this.form.classnum).then(res => {
				console.log(res)
				if(res.data.success)
				{
					if(res.data.data.isAdd == 1 || res.data.data.isEnd == 1)
					{
						uni.showModal({
						                title: '提示',
						                content: '班课不允许加入或已结束',
						                success: function(res) {
						                    if (res.confirm) {
						                        // 退出当前应用，改方法只在App中生效  
						                        // plus.runtime.quit();
						                    } else if (res.cancel) {
						                        console.log('用户点击取消');
						                    }
						                }
						            });
					}
					else {
						uni.showToast({
							title: '搜索成功',
							duration: 1000
								});
								setTimeout(function () {
									
								   uni.navigateTo({
								   	url: '/pages/class/JoinClass/JoinClass?item=' + encodeURIComponent(JSON.stringify(res))
								   	// url: '/pages/class/JoinClass/JoinClass'
								   })
								 
											   
								                   }, 1000);
								
							}
					}
					else{
						uni.showToast({
							title: res.data.msg,
							icon:'none',
							duration: 1000
								});
							}
					
				
			})
			// console.log("下一步")
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
	
	.form {
		padding: 100 200upx;
		margin-top: 100px;
	}
</style>
