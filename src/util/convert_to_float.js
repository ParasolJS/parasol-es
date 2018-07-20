const convert_to_float = x => {
	const converted = parseFloat(x);
	return isNaN(converted) ? x : converted;
};

export default convert_to_float;
