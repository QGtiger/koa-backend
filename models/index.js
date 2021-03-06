  
// scan all models defined in models:
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/utils/');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/utils/' + f);
}

module.exports.sync = (config) => {
    db.sync(config);
};