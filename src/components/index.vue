<template>
	<div id="app">
		<header class="header1">
			<label class="headerservice">客服</label><img src="../assets/img/home_logoside@2x.png" /><label class="headershare">分享</label>
		</header>
		<section class="section1">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<a href="clientsanjiujiu.html"><img src="../assets/img/banner01@3x.jpg" /></a>
					</div>
					<div class="swiper-slide">
						<a href="javascript:void(0)"><img src="../assets/img/banner02@3x.jpg" /></a>
					</div>
					<div class="swiper-slide">
						<a href="javascript:void(0)"><img src="../assets/img/banner03@3x.jpg" /></a>
					</div>
					<div class="swiper-slide">
						<a href="clientnopay.html"><img src="../assets/img/banner04@3x.jpg" /></a>
					</div>
					<div class="swiper-slide">
						<a href="javascript:void(0)"><img src="../assets/img/banner08@3x.jpg" /></a>
					</div>
				</div>
				<!-- Add Pagination -->
				<div class="swiper-pagination"></div>
			</div>
			<div id="contenticon">
				<dl class="iconstyle" @click="ajyc">
					<dt><img src="../assets/img/home_icon1@2x.png" /></dt>
					<dd>安检验车</dd>
				</dl>
				<dl class="iconstyle" @click="nsgj">
					<dt><img src="../assets/img/home_icon2@2x.png" /></dt>
					<dd>年审盖章</dd>
				</dl>
				<dl class="iconstyle" @click="wzcx">
					<dt><img src="../assets/img/home_icon3@2x.png" /></dt>
					<dd>违章查询</dd>
				</dl>
				<dl class="iconstyle" @click="clwz">
					<dt><img src="../assets/img/home_icon4@2x.png" /></dt>
					<dd>处理违章</dd>
				</dl>
				<dl class="iconstyle">
					<dt><img src="../assets/img/home_icon5@2x.png" /></dt>
					<dd>车辆报价</dd>
				</dl>
				<dl class="iconstyle" @click="kfjf">
					<dt><img src="../assets/img/home_icon6@2x.png" /></dt>
					<dd>扣分缴费</dd>
				</dl>
				<dl class="iconstyle">
					<dt><img src="../assets/img/home_icon7@2x.png" /></dt>
					<dd>验车网点</dd>
				</dl>
				<dl class="iconstyle" @click="ycgz">
					<dt><img src="../assets/img/home_icon8@2x.png" /></dt>
					<dd>验车规则</dd>
				</dl>
			</div>
			<div class="xqstyle">
				<img src="../assets/img/home.jpg" style="width: 100%;" />
				<a href="annualreviewseal.html">
					<div style="top: 74px;" class="xqstyle1">
					</div>
				</a>
				<a href="inspectionvehicle.html">
					<div style="top: 260px;" class="xqstyle1">
					</div>
				</a>
				<a href="inspection_environmentalvehicle.html">
					<div style="top: 445px;" class="xqstyle1">
					</div>
				</a>
				<a href="offsitedelegation.html">
					<div style="top: 629px;" class="xqstyle1">
					</div>
				</a>
			</div>
		</section>
		<footer>
			<dl class="footericon">
				<dt><img src="../assets/img/btn_home_pre@2x.png" /></dt>
				<dd>首页</dd>
			</dl>
			<dl class="footericon">
				<dt><img src="../assets/img/btn_car@2x.png" /></dt>
				<dd>车辆</dd>
			</dl>
			<dl class="footericon">
				<dt><img src="../assets/img/btn_coupons@2x.png" /></dt>
				<dd>优惠</dd>
			</dl>
			<dl class="footericon" @click="mymessage">
				<dt><img src="../assets/img/btn_my@2x.png" /></dt>
				<dd>我的</dd>
			</dl>
		</footer>
		<div id="mymodal" v-show="modalshow" v-cloak>
			<div id="modalcontent">
				<img src="../assets/img/ty@2x.png" class="bkimg">
				<label class="bkclose" @click="modalclose">×</label>
				<img src="../assets/img/my_img_man@2x.png" class="accountimg">
				<label class="bkphone">{{phone}}</label>
				<table>
					<tr @click="mycar">
						<td><img src="../assets/img/my_icon_car@2x.png"></td>
						<td>我的车辆</td>
					</tr>
					<tr>
						<td><img src="../assets/img/my_icon_order@2x.png"></td>
						<td>我的订单</td>
					</tr>
					<tr>
						<td><img src="../assets/img/my_icon_coupons@2x.png"></td>
						<td>优惠券</td>
					</tr>
					<tr>
						<td><img src="../assets/img/my_icon_service@2x.png"></td>
						<td>我的客服</td>
					</tr>
					<tr>
						<td><img src="../assets/img/my_icon_setting@2x.png"></td>
						<td>设置</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	import { serveraddress, guid } from '../util/public'
	//	console.log(yyctoken);
	import 'swiper/dist/css/swiper.min.css';  
	import Swiper from 'swiper'
	export default {
		data() {
			return {
				modalshow: false,
				phone:'',
				yyctoken: '',
				yycrefreshtoken:''
			}
		},
		mounted() {
			var myswiper = new Swiper('.swiper-container', {
				pagination: {
					el: '.swiper-pagination',
				},
				autoplay: true, //等同于以下设置
				autoplay: {
					delay: 10000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
				observer: true, //修改swiper自己或子元素时，自动初始化swiper 
				observeParents: false, //修改swiper的父元素时，自动初始化swiper 
				onSlideChangeEnd: function(swiper) {　　　
					swiper.update();　　　
					swiper.startAutoplay();　　
					swiper.reLoop();
				}
			})
//			this.refreshtoken();
			this.phone = localStorage.getItem("acphone");
			this.yyctoken = localStorage.getItem("yyctoken");
			this.yycrefreshtoken = localStorage.getItem("yycrefreshtoken");
		},
		methods: {
			mycar() { //我的车库跳转
				$('html,body').removeClass('ovfHiden');
				this.$router.push({
					path: './mygarage',
					query: {
						id: 1
					}
				});
			},
			ajyc() { //安检验车跳转
				var that = this;
				if(that.yyctoken == null) {
					that.$router.push({
						path: './login'
					});
				} else if(that.yyctoken != null) {
					that.$router.push({
						path: './mygarage',
						query: {
							id: 2
						}
					});
				}
			},
			nsgj() { //年审盖章跳转
				var that = this;
				if(that.yyctoken == null) {
					this.$router.push({
						path: './login'
					});
				} else {
					this.$router.push({
						path: './mygarage',
						query: {
							id: 2
						}
					});
				}
			},
			wzcx() { //违章查询跳转
				var that = this;
				if(that.yyctoken == null) {
					this.$router.push({
						path: './login'
					});
				} else {
					alert("跳转年审盖章页面");
				}
			},
			clwz() { //处理违章跳转
				window.location.href = "http://www.yiyanche.com/news/peonycard.html";
			},
			ycgz() { //验车规则跳转
				window.location.href = "http://www.yiyanche.com/news/ycgz.html";
			},
			kfjf() { //扣分缴费跳转
				window.location.href = "https://mybank.icbc.com.cn/icbc/conformity/forwardnr.jsp?f2z_Area_code=1001&url=/online/ctk_login.jsp?flag=pay";
			},
			mymessage() { //点击我的弹出侧滑模态框
				var that = this;
				if(that.yyctoken == null) {
					this.$router.push({
						path: './login'
					});
				} else {
					var that = this;
					$('html,body').addClass('ovfHiden');
					that.modalshow = true;
				}
			},
			modalclose() { //点击关闭按钮关闭侧滑模态框
				var that = this;
				$('html,body').removeClass('ovfHiden');
				that.modalshow = false;
			},
			refreshtoken(){
				var that =this;
				if(that.yyctoken == null) {
					$.ajax({
						type: "POST",
						contentType: 'application/x-www-form-urlencoded',
						url: "" + serveraddress + "/oauth/token",
						headers: {
							'Authorization': "Basic YXBwOmFwcA=="
						},
						data: {
							"grant_type": "password",
							"password": "0A54B19A13B6712DC04D1B49215423D8",
							"username": guid()
						},
						success: function(data) {
							localStorage.setItem("lstoken", data.access_token);
							localStorage.setItem("lsrefreshtoken", data.refresh_token);
						}
					});
				} else {
					$.ajax({
						type: "POST",
						contentType: 'application/json;charset=UTF-8',
						url: "" + serveraddress + "/api/v1/account/refresh?refreshToken=" + that.yycrefreshtoken,
						headers: {
							'client': 'CLIENT',
							'Authorization': 'Bearer ' + that.yyctoken
						},
						success: function(data) {
							if(data.code == 200) {
								localStorage.setItem("yyctoken", data.data.access_token);
								localStorage.setItem("yycrefreshtoken", data.data.refresh_token);
							} else {
								localStorage.removeItem("yyctoken");
								localStorage.removeItem("yycrefreshtoken");
							}
						},
						error: function(data) {
							if(data.status == 401) {
								localStorage.removeItem("yyctoken");
								localStorage.removeItem("yycrefreshtoken");
								this.$router.push({
									path: './login'
								});
							}
						}
					});
				}
			}
		}
		//		,
		//		beforeRouteEnter(to, from, next) {
		//			$.ajax({
		//				type: "POST",
		//				contentType: 'application/json;charset=UTF-8',
		//				url: "" + serveraddress + "/api/v1/account/refresh?refreshToken=" + yycrefreshtoken,
		//				headers: {
		//					'client': 'CLIENT',
		//					'Authorization': 'Bearer ' + yyctoken
		//				},
		//				success: function(data) {
		//					if(data.code == 200) {
		//						localStorage.setItem("yyctoken", data.data.access_token);
		//						localStorage.setItem("yycrefreshtoken", data.data.refresh_token);
		//						next();
		//					} else {
		//						localStorage.removeItem("yyctoken");
		//						localStorage.removeItem("yycrefreshtoken");
		//						next();
		//					}
		//				},
		//				error: function(data) {
		//					if(data.status == 401) {
		//						localStorage.removeItem("yyctoken");
		//						localStorage.removeItem("yycrefreshtoken");
		//						this.$router.push({
		//							path: './login'
		//						});
		//					}
		//				}
		//			});
		//		}
	}
</script>
<style>
	.header1 {
		width: 100%;
		height: 100px;
		text-align: center;
		background: #FF923C;
		position: fixed;
		top:0;
		z-index: 100;
	}
	header img {
		/*width: 117px;
				height: 30px;*/
		margin-top: 35px;
		line-height: 100px;
	}
	
	.headerservice {
		position: absolute;
		left: 20px;
		top: 30px;
		font-size: 28px;
		color: #FFFFFF;
	}
	
	.headershare {
		position: absolute;
		right: 20px;
		top: 30px;
		font-size: 28px;
		color: #FFFFFF;
	}
	
	.section1 {
		width: 100%;
		margin-top: 100px;
		margin-bottom: 120px;
	}
	
	.swiper-container {
		width: 100%;
		height: 317px;
	}
	
	.swiper-slide {
		width: 100%;
		line-height: 336px;
		color: #fff;
		font-family: Arial Black
	}
	
	.swiper-slide img {
		width: 100%;
	}
	
	#contenticon {
		width: 100%;
		height: 300px;
		
		background: #FFFFFF;
	}
	
	.iconstyle {
		width: 24.2%;
		display: inline-block;
		position: relative;
		margin-top: 28px;
		color: #333333;
		font-family: "PingFang-SC-Medium";
		font-size: 22px;
		text-align: center;
	}
	
	.xqstyle {
		position: relative;
		margin-top: 24px;
	}
	
	.xqstyle1 {
		position: absolute;
		width: 100%;
		height: 160px;
	}
	
	footer {
		border: 1px solid #F0F0F0;
		width: 99%;
		height: 120px;
		margin: 0 auto;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
	}
	
	.footericon {
		width: 24.2%;
		display: inline-block;
		margin-top: 18px;
		position: relative;
		font-family: "PingFang-SC-Medium";
		color: #999999;
		font-size: 22px;
		text-align: center;
	}
	
	#mymodal {
		width: 100%;
		height: 100%;
		position: fixed;
		background: white;
		left: 0;
		top: 0;
		z-index: 998;
		overflow: hidden;
	}
	
	.ovfHiden {
		overflow: hidden;
		height: 100%;
	}
	
	#modalcontent {
		width: 100%;
		margin: 0 auto;
		position: relative;
	}
	
	#modalcontent table {
		margin-top: 173px;
		margin-left: 65px;
		font-size: 28px;
		text-align: left;
		color: #333333
	}
	
	#modalcontent table img {
		width: 32px;
		height: 32px;
		vertical-align: bottom;
	}
	
	#modalcontent table tr td {
		padding: 15px;
	}
	
	.bkimg {
		width: 100%;
	}
	
	.bkclose {
		position: absolute;
		font-size: 65px;
		top: 20px;
		right: 20px;
		color: #FFFFFF;
	}
	
	[v-cloak] {
		display: none;
	}
	
	.bkphone {
		position: absolute;
		top: 271px;
		left: 75px;
		font-weight: bold;
		font-size: 30px;
		color: #000000;
	}
	
	.accountimg {
		position: absolute;
		top: 125px;
		left: 110px;
	}
</style>