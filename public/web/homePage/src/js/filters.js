const filters = {
	getSexStr(sex){
		let str = ''
		switch (sex){
			case 'male':
				str = '男';
				break;
			case 'famale':
				str = '女';
				break;
			default:
				str = '未知';
				break;	
		}
		return str
	},
	getTimeStr(length){
		let seconds = Math.round(length/1000);
		let Sec = seconds%60;
    	let Min = ((seconds-Sec)/60)%60;
    	let Hour = (seconds-Sec-Min*60)/3600;
    	let sec = Sec>9? Sec: '0'+Sec;
    	let min = Min>9? Min: '0'+Min;
    	let hour = Hour>9? Hour: '0'+Hour;
    	return hour + ' : ' + min + ' : ' + sec
	},
	getSeconds(length){
		let str = Math.floor(length/1000) + '秒';
    	return str
	}
}

export default filters