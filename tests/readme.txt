to run all tests in this file: >>
cd tests; npx vitest run test

to run all tests dynamically://
npm test

to run a specific test file://
npm test **filename

relevant instalations:
npm install -D @testing-library/react
npm install -D vitest
npm install -D jsdom


files filled: 
server/models


shcemas aren't working, need to look into into
resourceIndex functions are made to be reusable data manipulation for efficient post editing and numeric karma opperations


number 1 issue: everything in the schemas are timing out rather than completing. They seem to get stuck at the .save() function. 
Likely reason - inability to interact with the database beyond establishing a connection. check variable archetecture. Most sources
indicate that this is caused by network or database issues. 
number 2 issue: some of the files seem to have syntax errors, but running the code through AI isnt finding any issues. 
Likely reason - problems with the system dependencies or other resources not working 