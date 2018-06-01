export const serveraddress = "http://Development.yiyanche.com:8802";

export const yyctoken=localStorage.getItem("yyctoken");

export const yycrefreshtoken=localStorage.getItem("yycrefreshtoken");

export const lstoken = localStorage.getItem("lstoken");

export const lsrefreshtoken = localStorage.getItem("lsrefreshtoken");

export const acphone = localStorage.getItem("acphone");

export function guid(){ //随机存储名
	function S4() {
		return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return(S4() + S4()+ S4()+ S4()+ S4()+ S4() + S4() + S4());
}