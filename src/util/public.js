export var serveraddress = "http://Development.yiyanche.com:8802";

export var yyctoken=localStorage.getItem("yyctoken");

export var yycrefreshtoken=localStorage.getItem("yycrefreshtoken");

export var lstoken = localStorage.getItem("lstoken");

export var lsrefreshtoken = localStorage.getItem("lsrefreshtoken");

export var acphone = localStorage.getItem("acphone");

export function guid(){ //随机存储名
	function S4() {
		return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return(S4() + S4()+ S4()+ S4()+ S4()+ S4() + S4() + S4());
}