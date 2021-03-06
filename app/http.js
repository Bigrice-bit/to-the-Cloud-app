/* 
		@parms url 接口地址
		@parms method 请求方式
		@parms data 参数
		@parms isUpload 默认false 是否上传
 */

const BASE_URL = "http://120.77.38.228:8080"; //公共请求头

const TOKEN = uni.getStorageSync('TOKEN'); //TOKEN

const request = (url, method, data, isUpload = false) => {
	return new Promise((resolve, reject) => {
		if (!isUpload) {
			uni.request({
				url: BASE_URL + url, //仅为示例，并非真实接口地址。
				data: data,
				method: method,
				header: { //请求头可自定义
					// 'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Type': 'application/json',
					'token': TOKEN
				},
				success: (res) => { //具体捕获请看自己接口返回的形式
					if (res.data.code == 200 || res.data.code == 0 || res.data.code == 404 || res.data.code == 103) {
						// uni.showToast({
						// title: res.data.msg,
						// duration: 1000
						// });
						resolve(res);
					} else {
						// uni.showModal({
						// 	title: '提示',
						// 	showCancel: false,
						// 	content: res.data.msg,
						// 	success(res) {
						// 		if (res.confirm) {
						// 			// console.log('用户点击确定')
						// 			// uni.navigateBack({})
						// 		} else if (res.cancel) {
						// 			// console.log('用户点击取消')
						// 		}
						// 	}
						// })
						uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 3000
						});
					}
				},
				fail(error) {
					reject(error)
				},
				complete() {

				}
			});
		} else {
			uni.uploadFile({
				url: _url,
				filePath: data,
				name: 'file',
				header: {
					'X-Access-Token': TOKEN
				},
				formData: {
					file: data,
					fileType: '1',
					pathType: "1"
				},
				success: (uploadFileRes) => {
					let parms = JSON.parse(uploadFileRes.data)
					let imgurls = parms.result.filePath
					resolve(imgurls)
				},
				fail: () => {
					uni.showToast({
						title: '图片上传失败',
						icon: 'none'
					})
				}
			});
		}

	})
}

export default {
	request //向外暴露request
}
