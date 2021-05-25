<template>
	<view>
		<u-navbar title-color="#000000" back-icon-color="#000000" :is-fixed="isFixed" :is-back="isBack"
			:background="background" :back-text-style="{color: '#fff'}" :title="title" :back-icon-name="backIconName"
			:back-text="backText" @click="newcreate"> </u-navbar>
		<view class="list-content">
			<view class="list">
				<view class="li " >
					<view class="avator">
						<image class="img" src="../../static/user/face.jpg" mode="widthFix"></image>
					</view>
					<view class="text">
						<view class="phone-number">陈泓敏</view>
						<view class="phone-number">18909XXXX67</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
			<!-- <view class="list">
				<view class="li " >
					<view class="text">姓名</view>
					<view class="to" >后端返回</view>
				</view>
				<view class="li " >
					<view class="text">账号</view>
					<view class="to" >后端返回</view>
				</view>
				<view class="li " >
					<view class="text">出生年份</view>
					<view class="to" >后端返回</view>
				</view>
				<view class="li " >
					<view class="text">选择性别</view>
					<u-radio-group :shape="shape" :size="size" :width="width" :wrap="wrap" v-model="value" @change="radioGroupChange" :activeColor="activeColor">
						<u-radio @change="radioChange" v-for="(item, index) in list" :disabled="item.disabled"
							:key="index" :name="item.name"
						>{{item.name}}</u-radio>
					</u-radio-group>
				</view>
				<view class="li " >
					<view class="text">你所在的学校、院系及专业</view>
					<view>本人的学校院系专业</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">选择身份</view>
				</view>
				<view class="li " >
					<view class="text">我是老师</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">我是学生</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">其他</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="text">学号/工号</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view> -->
				<view class="list"></view>
				<u-cell-group class="">
					<u-cell-item center :is-link="true"  value="后端返回" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="姓名" >
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true"  value="后端返回" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="账号" >
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true"  value="后端返回" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="出生年份" >
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true"  value="" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="选择性别" >
					 <u-radio-group :shape="shape" :size="size" :width="width" :wrap="wrap" v-model="value" @change="radioGroupChange" :activeColor="activeColor">
					 	<u-radio @change="radioChange" v-for="(item, index) in list" :disabled="item.disabled"
					 		:key="index" :name="item.name"
					 	>{{item.name}}</u-radio>
					 </u-radio-group>
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true" :label="label" value="" i ndex="index" @click="ChangeSchool" :hover-class="hoverClass"
					 :arrow="arrow" title="你所在的学校、院系及专业(索引列表)" >
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item center :is-link="true"  value="" index="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="选择身份" >
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
						<u-radio-group :shape="shape" :size="size" :width="width" :wrap="wrap" v-model="value" @change="radioGroupChange" :activeColor="activeColor">
							<u-radio @change="radioChange" v-for="(item, index) in identity" :disabled="item.disabled"
								:key="index" :name="item.name" v-model="iden"
							>{{item.name}}</u-radio>
						</u-radio-group>
					</u-cell-item>
					<u-cell-item center :is-link="true"  value="后端返回" index="index" @click="click" :hover-class="hoverClass"
					 :arrow="false" title="学号/工号" >
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
				</u-cell-group>
				
			</view>
		</view>
		<button type="error" class="button" @click="SaveChange">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'用户信息',
				backText: '返回',
				backIconName: 'nav-back',
				isBack: true,
				search: false,
				custom: false,
				isFixed: true,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(255, 255, 255), rgb(255, 255, 255))'
				},
				list: [
								{
									name: '男',
									disabled: false
								},
								{
									name: '女',
									disabled: false
								}
							],
				identity:[
								{
									name: '我是老师',
									disabled: false,
									index:0
								},
								{
									name: '我是学生',
									disabled: false,
									
								},
								{
									name: '其他',
									disabled: false,

								}
							],
							// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
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
				iden:'',
			};
		},
		onLoad() {
			try {
			    const value = uni.getStorageSync("lifeData");
			    if(value) {
			        console.log(value);
					if(value.vuex_jurisdiction.name === '0')
					{
						this.iden = '我是老师'
					}
					else if(value.vuex_jurisdiction.name === '1')
					{
						this.iden = '我是学生'
					}
					else
					{
						this.iden = '其他'
					}
					console.log(this.iden)
			    }
			} catch(e){
			    console.log(e);
			}
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
						this.iden = e;
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
			click(index) {
				// console.log(index);
			},
			ChangeSchool(){
				uni.navigateTo({
						url: './selectSchool'
				});
			},
			SaveChange(){
				let i = '1';
				console.log(this.iden)
				if(this.iden === "我是老师")
				{
					this.$u.vuex('vuex_jurisdiction.name','0');
				}
				else if(this.iden === "其他"){
					this.$u.vuex('vuex_jurisdiction.name','2');
				}
				else{
					this.$u.vuex('vuex_jurisdiction.name','1');
				}
				
				console.log("保存成功")
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
