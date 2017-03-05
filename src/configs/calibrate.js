var env = require('./env.json');
var fs = require('fs');

env.current = process.argv[2];

var json = JSON.stringify(env);
fs.writeFile('./src/configs/env.json', json, 'utf8', function(err){
    console.log(env);
});
