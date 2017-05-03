var connection = require('./dbConnection').connection;


var asyncMap = function(arrayOfFunctions, cb) {

};


var querySchoolTable = function(column, value, cb) {
  db.query('SELECT * FROM schools WHERE ? = ?', [column, value], function (err, data, fields) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, err);
    }
  });
};

var mySearchFunction = function(prefs, cb) {
  let queries = [];
  for (let key in prefs) {
    queries.push(function (cb) {
      querySchoolTable(key, prefs[key], function (err, data) {
        if (err) {
          // throw it or just handle your error some other way
          throw err;
        } else {
          cb(data);
        }
      });
    });
  }
  asyncMap(queries, function (arrOfData) {
    // and here arrOfData is an array of arrays, the inner arrays represent the result of querying the table for a given column/value pair (like STATE='CA' or MAJOR='Computer Science' or whatever);
    // now you can just sort it using whatever method you want
  });
};