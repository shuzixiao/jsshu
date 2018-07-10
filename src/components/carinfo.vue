<template>
	<div>
		<mt-header :title="carinfo.plateNo">
			<router-link :to="{path:'./mygarage',query:{id:1}}" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
			<mt-button slot="right" class="carxiugai" v-show="xg" @click="caredit">修改</mt-button>
		</mt-header>
		<div class="carmessage">
			<div class="cheliangxinxi">车辆信息</div>
			<ul>
				<li>
					<div class="carmessageleft">车辆识别代号</div>
					<div class="carmessageright">{{carinfo.vin}}</div>
					<div class="carxg" v-show="xgshow"><img src="../assets/img/icon_help.png" style="width: 20px;height: 20px;"></div>
				</li>
				<li>
					<div class="carmessageleft">发动机号</div>
					<div class="carmessageright">{{carinfo.engineNo}}</div>
					<div class="carxg" v-show="xgshow"><img src="../assets/img/icon_help.png" style="width: 20px;height: 20px;"></div>
				</li>
				<li>
					<div class="carmessageleft">车辆类型</div>
					<div class="carmessageright">{{carinfo.vehicleType}}</div>
					<div class="carxg" v-show="xgshow">></div>
				</li>
				<li>
					<div class="carmessageleft">车辆性质</div>
					<div class="carmessageright">{{carinfo.useCharacter}}</div>
					<div class="carxg" v-show="xgshow">></div>
				</li>
				<li>
					<div class="carmessageleft">注册日期</div>
					<div class="carmessageright">{{carinfo.registerDate | formatDateTime}}</div>
					<div class="carxg" v-show="xgshow">></div>
				</li>
				<li>
					<div class="carmessageleft">核定载人数</div>
					<div class="carmessageright">{{carinfo.seat}}</div>
					<div class="carxg" v-show="xgshow">></div>
				</li>
				<li class="liborderno">
					<div class="carmessageleft">行驶证照片</div>
					<div class="carmessageright">
						<a href="javascript:void(0)" @click="imgshow(carinfo.originalFront)"><img style="width: 130px;height: 89px;" :src="carinfo.originalFront"></a>
					</div>
					<div class="carxg" v-show="xgshow">></div>
				</li>
			</ul>
			<div class="cheliangxinxi">交强险信息</div>
			<ul>
				<li>
					<div class="carmessageleft">交强险到期日期</div>
					<div class="carmessageright">{{carinfo.expireTime | formatDateTime}}</div>
				</li>
				<li class="liborderno">
					<div class="carmessageleft">交强险保单照片</div>
					<div class="carmessageright">
						<a href="javascript:void(0)" @click="imgshow(carinfo.insuranceEctype)"><img style="width: 130px;height: 89px;" :src="carinfo.insuranceEctype"></a>
					</div>
				</li>
			</ul>
			<div class="limargin" v-show="xgshow">
				<button type="button" class="baocun">保存</button>
				<button type="button" class="shanchu">删除</button>
			</div>
		</div>
		<div id="imgmodal" v-show="modalshow" v-cloak>
			<img :src="imgshowurl" @click="imgclose" class="imgshowstyle">
		</div>
	</div>
</template>

<script>
	import { serveraddress } from '../util/public'
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				carid: this.$route.query.id,
				yyctoken: '',
				carinfo: [],
				modalshow: false,
				imgshowurl: '',
				xgshow:false,
				xg:true
			}
		},
		mounted() {
			this.yyctoken = localStorage.getItem("yyctoken");
			this.carmessage();
		},
		methods: {
			carmessage() {
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
							that.carinfo = data.data[0];
						} else {
							Toast(data.message);
						}
					},
					error: function(data) {
						if(data.status == 401) {
							return;
						}
					}
				})
			},
			caredit()
			{
				var that = this;
				that.xgshow = true;
				that.xg =false;
			},
			imgshow(urls) {
				var that = this;
				that.imgshowurl = urls;
				$('html,body').addClass('ovfHiden');
				that.modalshow = true;
			},
			imgclose() {
				var that = this;
				$('html,body').removeClass('ovfHiden');
				that.modalshow = false;
			}
		},
		filters: {
			formatDateTime: function(timeStamp) {
				//				if(!timeStamp)return ''
				var date = new Date();
				date.setTime(timeStamp);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			}
		}
	}
</script>

<style>
	.carmessage {
		width: 100%;
		margin: 0 auto;
	}
	
	.cheliangxinxi {
		text-align: left;
		margin-left: 41px;
		margin-top: 20px;
		margin-bottom: 20px;
		font-size: 26px;
		color: #666666;
	}
	
	.carxiugai {
		margin-right: 10px;
	}
	
	.carmessage ul {
		background-color: #FFFFFF;
	}
	
	.carmessage ul li {
		width: 100%;
		height: 90px;
		line-height: 90px;
		list-style: none;
		border-bottom: 1px solid #F0F0F0;
		position: relative;
	}
	
	.liborderno {
		border-bottom: none !important;
	}
	.limargin
	{
		margin-top: 50px;
		margin-left: 30px;
		margin-right: 30px;
		margin-bottom: 50px;
	}
	.carmessageleft {
		position: absolute;
		left: 41px;
		font-size: 27px;
		color: #333333;
	}
	
	.carmessageright {
		position: absolute;
		right: 40px;
		font-size: 27px;
		color: #666666;
	}
	.carxg
	{
		font-size: 35px;
		position: absolute;
		right: 6px;
		width: 30px;
		color: #CCCCCC;
	}
	#imgmodal {
		width: 100%;
		height: 100%;
		position: fixed;
		background: black;
		left: 0;
		top: 0;
		z-index: 998;
		overflow: hidden;
	}
	
	.imgshowstyle {
		width: 100%;
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.baocun
	{
		width: 100%;height: 90px;background-color: #FF923C;font-size: 36px;color:#FFFFFF;border: 0;border-radius: 15px;
	}
	.shanchu
	{
		width: 100%;height: 90px;background-color: #FFFFFF;font-size: 36px;color:#FF923C;border: 1px solid #FF923C;border-radius: 15px;margin-top: 10px;
	}
	[v-cloak] {
		display: none;
	}
</style>