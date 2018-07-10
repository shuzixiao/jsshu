<template>
	<section id="app">
		<div id="logo">
			<img src="../assets/img/logo@2x.png" />
		</div>
		<div id="loginbox">
			<div id="phonebox">
				<div class="phonelabel">手机号</div>
				<div class="phoneinput"><input type="text" placeholder="请输入手机号" @keyup="codex" v-model="phone" /></div>
				<button class="phonebutton" :style="{color:thecolor}" :disabled="phonedisabled" @click="hqyzm">{{message}}</button>
			</div>
			<div id="codebox">
				<div class="codelabel">验证码</div>
				<div class="codeinput"><input type="text" @keyup="codex" placeholder="请输入验证码" v-model="yzm" /></div>
			</div>
		</div>
		<div id="loginbutton">
			<button class="noconfirm" :style="{background:qdbk}" :disabled="confirmdisabled" @click="queding">确定</button>
		</div>
		<div id="protocol">
			<label class="protocol1">点击确定，即表示已阅读并同意<label class="protocol2">《用户协议》</label></label>
		</div>
	</section>
</template>
<script>
	import { serveraddress } from '../util/public'
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				phonedisabled: false,
				phone: '',
				yzm: '',
				message: "获取验证码",
				time: 60,
				isOvertime: false,
				thecolor: '#FF923C',
				confirmdisabled: true,
				qdbk: "#E6E6E6"
			}
		},
		methods: {
			hqyzm() { //获取验证码
				var that = this;
				if(that.phone == "") {
					Toast('手机号不能为空');
					return;
				}
				$.get("" + serveraddress + "/api/v1/sms/authCode/" + that.phone + "/4000", function(result) {
					if(result.code == 200) {
						Toast('发送成功');
						that.yzmCountdown();
					} else {
						Toast(result.message);
					}
				})
			},
			yzmCountdown() { //验证码倒计时
				var that = this;
				if(this.isOvertime) {
					return false;
				}
				var sendTimer = setInterval(function(){
					that.isOvertime = true;
					that.phonedisabled = true;
					that.thecolor = "#D9D9D9";
					that.time--;
					that.message = "重新发送(" + that.time + ")";
					if(that.time < 0) {
						that.isOvertime = false;
						that.phonedisabled = false;
						that.thecolor = "#FF923C";
						clearInterval(sendTimer);
						that.message = "获取验证码";
					}
				}, 1000)
			},
			codex() { //填写手机号验证码触发确定按钮
				var that = this;
				if(that.phone.length == 11 && that.yzm.length == 4) {
					that.confirmdisabled = false;
					that.qdbk = "#FF923C";
				}
				if(that.phone.length != 11 || that.yzm.length != 4) {
					that.confirmdisabled = true;
					that.qdbk = "#E6E6E6";
				}
			},
			queding() { //确定登录
				var that = this;
				$.ajax({
					type: "POST",
					url: "" + serveraddress + "/api/v1/account/login?phone=" + that.phone + "&authCode=" + that.yzm + "&code=4000",
					headers: {
						'client': 'CLIENT'
					},
					success: function(data) {
						if(data.code == 200) {
							localStorage.setItem("yyctoken", data.data.access_token);
							localStorage.setItem("yycrefreshtoken", data.data.refresh_token);
							localStorage.setItem("acphone", that.phone);
							that.$router.push({
								path: './'
							});
							return;
						} else {
							Toast(data.message);
							return;
						}
					},
					error: function(data) {
						if(data.status == 500) {
							Toast("连接超时,请稍后重试");
							return;
						} else {
							Toast(data.message);
							return;
						}

					}
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	section {
		width: 100%;
		margin: 0 auto;
	}
	
	#logo {
		width: 100%;
		margin-top: 120px;
		text-align: center;
	}
	
	#loginbox {
		margin: 124px 60px 100px 60px;
	}
	
	#phonebox {
		width: 100%;
		height: 90px;
		background: #FAFAFA;
		border: 1px solid #E6E6E6;
		position: relative;
	}
	
	.phonelabel {
		line-height: 35px;
		position: absolute;
		top: 30px;
		position: absolute;
		font-size: 30px;
		color: #666666;
		left: 10px;
	}
	
	.phoneinput {
		width: 205px;
		height: 90px;
		line-height: 90px;
		position: absolute;
		top: 5px;
		left: 110px;
	}
	
	.phoneinput input {
		width: 100%;
		font-size: 30px;
		color: #CCCCCC;
		border: 0;
		background: #FAFAFA;
	}
	
	.phonebutton {
		height: 35px;
		border: 0;
		background: #FAFAFA;
		color: #FF923C;
		position: absolute;
		top: 29px;
		right: 2px;
		font-size: 24px;
	}
	
	#codebox {
		width: 100%;
		height: 90px;
		margin-top: 30px;
		background: #FAFAFA;
		border: 1px solid #E6E6E6;
		position: relative;
	}
	
	.codelabel {
		line-height: 35px;
		position: absolute;
		top: 30px;
		font-size: 30px;
		color: #666666;
		left: 10px;
	}
	
	.codeinput {
		width: 205px;
		height: 90px;
		line-height: 90px;
		position: absolute;
		top: 5px;
		left: 110px;
	}
	
	.codeinput input {
		width: 100%;
		font-size: 30px;
		color: #CCCCCC;
		border: 0;
		background: #FAFAFA;
	}
	
	#loginbutton {
		margin: 100px 60px 24px 60px;
	}
	
	.noconfirm {
		width: 100%;
		height: 90px;
		background: #E6E6E6;
		border: 1px solid #E6E6E6;
		color: #FFFFFF;
		font-size: 36px;
	}
	
	#protocol {
		width: 100%;
		text-align: center;
	}
	
	.protocol1 {
		font-size: 24px;
		color: #B3B3B3
	}
	
	.protocol2 {
		font-size: 24px;
		color: #FF923C
	}
</style>