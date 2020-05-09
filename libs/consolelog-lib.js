function logit(data, fileinfo) {
	if (fileinfo) {
		console.log('\n', fileinfo + '     -----------', '\n',  data, '\n');
	} else {
		console.log('\n', '     -----------', '\n',  data, '\n');
	}
	return;
};


export default logit;