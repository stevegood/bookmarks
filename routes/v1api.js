var express = require('express');
var router = express.Router();

module.exports = function(db){
    require('./v1api/bookmarks')(router, db);
    return router;
};