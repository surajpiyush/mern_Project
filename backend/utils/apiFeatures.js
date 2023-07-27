class ApiFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	Search() {
		const keyword = this.queryStr.keyword
			? {
					name: {
						$regex: this.queryStr.keyword,
						$options: "i",
					},
			  }
			: {};
		console.log(keyword);
		this.query = this.query.find({ ...keyword });
		return this;
	}

	Filter() {
		const strCopy = { ...this.queryStr };
		console.log(strCopy);
		// remove some fields for category
		const removeFields = ["keyword", "page", "filter"];
		removeFields.forEach((item) => delete strCopy[item]);
		console.log("this is strcopyremoved", strCopy);
		// filter for price and rating
		this.query = this.query.find(strCopy);
		let queryStr = JSON.stringify(strCopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
		this.query = this.query.find(JSON.parse());
		console.log(queryStr);
		return this;
	}
	paginations(resultPerPage){
		console.log('this is pagination');
		const currentPage=Number( this.queryStr.page )|| 1 
		const skip=resultPerPage*(currentPage -1)
  this.query=this.query.limit(resultPerPage).skip(skip)
  return this
	}
}
module.exports = ApiFeatures;
