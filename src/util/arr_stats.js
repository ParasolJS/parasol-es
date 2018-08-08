// inspired by: https://gist.github.com/Daniel-Hug/7273430
const arr = {
	max: function(array) {
		return Math.max.apply(null, array);
	},

	min: function(array) {
		return Math.min.apply(null, array);
	},

	range: function(array) {
		return arr.max(array) - arr.min(array);
	},

	extents: function(array) {
		return [arr.min(array), arr.max(array)];
	},

	sum: function(array) {
		let num = 0;
		for (let i = 0, l = array.length; i < l; i++) num += array[i];
		return num;
	},

	mean: function(array) {
		return arr.sum(array) / array.length;
	},

	variance: function(array) {
		const mean = arr.mean(array);
		return arr.mean(array.map(function(num) {
			return Math.pow(num - mean, 2);
		}));
	},

	standardDeviation: function(array) {
		return Math.sqrt(arr.variance(array));
	},

	zScores: function(array) {
		const mean = arr.mean(array);
		const standardDeviation = arr.standardDeviation(array);
		return array.map(function(num) {
			return (num - mean) / standardDeviation;
		});
	},

	normed: function(array) {
		const extents = arr.extents(array);
		return array.map(function(num) {
			if (!isNaN(num)){
				return (num - extents[0]) / (extents[1] - extents[0]);
			} else {
				return num
			}
		});
	}
};

export default arr;
