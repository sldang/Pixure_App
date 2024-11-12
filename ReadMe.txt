All the tests are going to be stored in the UnitTest file

to run a test, cd into unitTest and type:
npx jest /*name_of_file*/
ex. npx jest index.test.js

to run all tests, cd into unitTest and type:
npx jest
Note: this will try to test another file (App.test.js), for now ignore this. 
It will also try to test example.test.js, ignore this too I will delete that file when I dont need it anymore


Main issue right now is that the URI seems to be undefined, or is involved in passing undefined values:
Error: The `uri` parameter to `openUri()` must be a string, got "undefined". Make sure the 
first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.



basic changes catalogued:

added .env to unitTest for local use of MONGOOSE_URI 
added example.test.js for debuging to prove that the URI works
added jest.setup.js to explicitly specify jest behavior hoping this would fix the issue (did not)
minor modifications to other files to make sure jest works:
ex. package.json added 
,
  "jest": {
     "setupFiles": ["./unitTests/jest.setup.js"]
  }
