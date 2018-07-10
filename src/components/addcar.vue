<template>
	<div class="addcarinfo">
		<mt-header title="上传车辆信息">
			<router-link :to="{path:'./mygarage',query:{id:2}}" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<div class="tianjiatishi">
			&nbsp;&nbsp;<img src="../assets/img/img_announcement.png" />&nbsp;易验车不会通过任何渠道泄露您的个人信息请放心上传。
		</div>
		<div class="tishititle">
			请准备好行驶证正本
		</div>
		<div class="tishiimg">
			<img src="../assets/img/20180612102524.jpg" />
		</div>
		<div class="tishibutton">
			<a href="javascript:void(0)" class="file">开始拍照
				<input type="file" accept="image/*" capture="camera" @change="camerachange">
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			camerachange(e) {
				var files = e.target.files[0];
				var render = new FileReader();
				render.readAsDataURL(files);
				render.onload = function(event) {
					debugger;
					var imagebase = event.target.result.replace("data:image/jpeg;base64,", "");
					var site = {
						"access_token": "24.e807a0a73566ab83738c8600ed72ff01.2592000.1531384515.282335-10430059",
						"detect_direction": "true",
						"accuracy": "normal",
						"image": imagebase
					}
					$.ajax({
						type: "post",
						contentType: 'application/x-www-form-urlencoded;',
						url: "https://aip.baidubce.com/rest/2.0/ocr/v1/vehicle_license",
						dataType:"json",
						data: site,	
						success: function(data){
							debugger;
						}
					})
				}
			}
		}
	}
</script>

<style>
	.addcarinfo {
		width: 100%;
	}
	.tianjiatishi {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: blanchedalmond;
		font-size: 23px;
		color: #FF923C;
	}
	
	.tianjiatishi img {
		width: 30px;
		height: 30px;
		vertical-align: sub;
	}
	
	.tishititle {
		text-align: left;
		margin-left: 30px;
		margin-top: 50px;
		margin-bottom: 40px;
		font-size: 35px;
		color: #333333
	}
	
	.tishiimg {
		margin: 0px 30px 130px 30px;
	}
	
	.tishiimg img {
		width: 100%;
		border-radius: 20px;
	}
	
	.tishibutton {
		margin-left: 35px;
		margin-right: 35px;
	}
	/*.tishibutton button {
		width: 100%;
		height: 80px;
		background: #FF923C;
		color: #FFFFFF;
		border: 0;
		border-radius: 50px;
		font-size: 25px;
	}*/
	
	.tishibutton .file {
		position: relative;
		display: inline-block;
		background: #FF923C;
		border: 0;
		font-size: 25px;
		border-radius: 50px;
		width: 100%;
		height: 80px;
		overflow: hidden;
		color: #FFFFFF;
		text-decoration: none;
		text-indent: 0;
		line-height: 80px;
	}
	
	.tishibutton .file input {
		position: absolute;
		font-size: 100px;
		right: 0;
		top: 0;
		opacity: 0;
	}
</style>