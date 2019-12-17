// Author: Joshua William Adams
// Rev History:
// No.: A     Desc.: Issued for review                          Date: 17/12/2019
// No.: 0     Desc.: Issued for use                             Date: 17/12/2019
//
// Description: Module for all filesystem related opertions in the application.

// file system operations
var fs = require('fs');

// json to csv parser
const Json2csvParser = require('json2csv').Parser;

function getKeys(obj) {

  var keys = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  return keys;

}

function jsonToCsv (arr) {

  const fields = getKeys(arr[0]);
  const opts = { fields };
  var csv;

  try {
    const parser = new Json2csvParser(opts);
    csv = parser.parse(arr);
  } catch (err) {
    throw err;
  }

  return csv;

}

function outputToCsv (filePath, data) {
  // convert data to csv format
  csv = jsonToCsv(data);

  // write data to file
  fs.writeFile(filePath, csv, function (err) {
    if (err) throw err;
      console.log('.csv has been saved!');
  });

  return;
}

// Return all objects to calling javascript
exports.outputToCsv = outputToCsv;
