const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';

const fs = require('fs');

var config = null;
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'test') {
  console.log(`Load ${testConfig}...`);
  config = Object.assign(require(defaultConfig), require(testConfig));
} else {
  console.log(`Load ${defaultConfig}...`);
  config = require(defaultConfig);
  try {
      if (fs.statSync(overrideConfig).isFile()) {
          console.log(`Load ${overrideConfig}...`);
          config = Object.assign(config, require(overrideConfig));
      }
  } catch (err) {
      console.log(`Cannot load ${overrideConfig}.`);
  }
}

module.exports = config;