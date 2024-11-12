//example.test.js
//this is a proof of concept & debuging file
//this is not a test file, run it using Node.js not Jest (node example.test.js)

require('dotenv').config({ path: './.env'});

console.log("MONGO_URI:", process.env.MONGO_URI);
