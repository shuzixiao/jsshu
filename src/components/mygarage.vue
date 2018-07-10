<template>
	<div id="app">
		<!--<header class="header2">
			<label class="pagereturn" @click="pagereturn"><返回</label>
			<label>我的车辆</label>
		</header>-->
		<mt-header title="我的车库">
			<router-link to="/" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<section class="section2">
			<div id="carcontent">
				<div id="nocar" v-show="nocarshow" v-cloak>
					<img src="../assets/img/car_img_default@2x.png" /><br /><br />
					<label>您还没有添加车辆哦~</label>
				</div>
				<div id="ycar" v-show="ycarshow" v-cloak v-for="item in carlist">
					<div class="ycarcontent">
						<div class="ycarcontenttop">
							<img src="../assets/img/img_no_car@2x.png" class="ycarcontentimg" />
							<label class="ycarcontentlabel1">{{item.plateNo}}</label>
							<label class="ycarcontentlabel2">{{item.vehicleType}}</label>
							<button type="button" v-show="lookcar" @click="ckcar(item)" class="ycarcontentbutton">查看车辆</button>
							<button type="button" v-show="djnj" class="ycarcontentbutton">点击年检</button>
						</div>
						<div class="ycarcontentbottom">
							<div v-if="item.nextValidateDay>90">
								<img src="../assets/img/img_time@2x.png" style="vertical-align:middle;">&nbsp;&nbsp;&nbsp;年检有效期还剩<label class="ycarcontentlabel3">&nbsp;&nbsp;{{item.nextValidateDay}}&nbsp;&nbsp;</label>天
							</div>
							<div v-if="item.nextValidateDay<=90">
								<img src="../assets/img/img_time@2x.png" style="vertical-align:middle;">&nbsp;&nbsp;&nbsp;年检有效期还剩<label class="ycarcontentlabel4">&nbsp;&nbsp;{{item.nextValidateDay}}&nbsp;&nbsp;</label>天
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="carbutton">
				<router-link to="/addcar">
				<button type="button" class="addcar">添加车辆</button>
				</router-link>
			</div>
		</section>
	</div>
</template>
<script>
	import { serveraddress } from '../util/public'
	export default {
		data() {
			return {
				carlist: [],
				nocarshow: false,
				ycarshow: false,
				lookcar: false,
				djnj: false,
				yyctoken: ''
			}
		},
		created() {},
		mounted() {
			this.yyctoken = localStorage.getItem("yyctoken");
			this.cardata();
			this.buttonshow();
		},
		methods: {
			cardata() {
				var that = this;
				$.ajax({
					type: "get",
					url: "" + serveraddress + "/api/v1/car/info/list",
					headers: {
						'client': 'CLIENT',
						'Authorization': 'Bearer ' + that.yyctoken
					},
					success: function(data) {
						if(data.code == 200) {
							if(data.data.length == 0) {
								that.nocarshow = true
								that.carlist = [];
								$("#carbutton").css("margin-top", "280px");
							} else {
								that.ycarshow = true
								that.carlist = data.data;
								$("#carbutton").css("margin-top", "50px");
							}
						} else {
							that.nocarshow = true
							alert(data.message);
							that.carlist = [];
							$("#carbutton").css("margin-top", "280px");
						}
					},
					error: function(data) {
						if(data.status == 401) {
							//							debugger;
							//							window.location.href = "login.html";
						} else {
							that.nocarshow = true
							alert("车辆信息查询失败,请检查网络后重试");
							that.carlist = [];
							$("#carbutton").css("margin-top", "280px");
						}
					}
				})
			},
			ckcar(item)
			{
				this.$router.push({path:'./carinfo',query: {id: item.id}})
			},
			buttonshow() {
				if(this.$route.query.id == 1) {
					this.lookcar = true;
				} else {
					this.djnj = true;
				}
			}
		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
		font-family: "微软雅黑";
	}
	
	body {
		background: #F0F0F0;
	}
	.section2 {
		width: 100%;
		margin: 0 auto;
	}
	
	#carcontent {
		width: 100%;
	}
	
	#nocar {
		width: 100%;
		text-align: center;
		margin-top: 200px;
	}
	
	#nocar label {
		font-size: 20px;
		color: #666666;
		margin-top: 10px;
	}
	
	#ycar {
		margin-left: 30px;
		margin-right: 30px;
	}
	
	.ycarcontent {
		width: 100%;
		height: 210px;
		border-radius: 15px 15px 0px 0px;
		background: #FFFFFF;
	}
	
	.ycarcontenttop {
		width: 100%;
		height: 140px;
		border-radius: 15px 15px 0px 0px;
		background: #FF923C;
		margin-top: 20px;
		position: relative;
	}
	
	.ycarcontentimg {
		position: absolute;
		top: 20px;
		left: 20px;
	}
	
	.ycarcontentlabel1 {
		position: absolute;
		top: 30px;
		left: 190px;
		font-size: 30px;
		color: #FFFFFF;
	}
	
	.ycarcontentlabel2 {
		position: absolute;
		top: 82px;
		left: 190px;
		font-size: 22px;
		color: #FFFFFF;
	}
	
	.ycarcontentlabel3 {
		font-size: 28px;
		color: #5293E7;
	}
	
	.ycarcontentlabel4 {
		font-size: 28px;
		color: red;
	}
	
	.ycarcontentbutton {
		width: 180px;
		height: 60px;
		color: #FF923C;
		font-size: 26px;
		position: absolute;
		top: 45px;
		right: 20px;
		background: #FFFFFF;
		border-radius: 15px;
		border: 0;
	}
	
	.ycarcontentbottom {
		height: 70px;
		line-height: 70px;
		margin-left: 20px;
		font-size: 20px;
		text-align: left;
	}
	
	#carbutton {
		margin-left: 30px;
		margin-right: 30px;
		margin-top: 280px;
	}
	
	.addcar {
		width: 100%;
		height: 70px;
		border-radius: 30px;
		background: #FF923C;
		border: 0;
		font-size: 22px;
		color: #FFFFFF;
	}
	
	[v-cloak] {
		display: none;
	}
</style>