// const config = require('config');
// console.log(config.get('host')); // Outputs: localhost
// console.log(config.get('database.host')); // Outputs: localhost

// if (config.has('host') && config.has('database.host')) {
//     console.log('Configuration settings are correctly loaded.');
//   } else {
//     console.log('Some configuration settings are missing.');
//   }

//   function validateConfiguration() {
//     const requiredSettings = ['host', 'database.host', 'database.port', 'database.name'];
//     for (const setting of requiredSettings) {
//       if (!config.has(setting)) {
//         throw new Error(`Missing configuration setting: ${setting}`);
//       }
//     }
//     console.log('All required configuration settings are present.');
//   }
  
//   // Call the validation function
//   validateConfiguration();

const mongoose = require('mongoose');

const uri = 'mongodb+srv://makdzer:PleaseWork1@firstweb.rj7jx.mongodb.net/esentia?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

  