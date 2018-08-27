const config = require('./webpack-static.config');
delete config.entry.static;

module.exports = config;
