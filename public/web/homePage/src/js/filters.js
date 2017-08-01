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
	}
}

export default filters