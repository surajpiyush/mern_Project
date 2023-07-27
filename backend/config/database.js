const mongoose = require("mongoose");
const connnectDatabase = () => {
	mongoose
		.connect(process.env.DB_URI)
		.then((res) => {
			console.log(`mongodb is connected ${res.connection.host}`);
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = connnectDatabase;
