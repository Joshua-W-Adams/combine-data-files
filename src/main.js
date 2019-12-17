// Author: Joshua William Adams
// Rev History:
// No.: A     Desc.: Issued for review                          Date: 17/12/2019
// No.: 0     Desc.: Issued for use                             Date: 17/12/2019
//
// Description: Main application file.

// Import external librarys
const fs = require("fs");
const XlsxPopulate = require('xlsx-populate');

// import custom modules
var fsops = require("./modules/fs-ops.js");

function getXlsxData (filePath) {
  return new Promise (function (resolve, reject) {
    // Load a new blank workbook
    console.log(filePath);
    XlsxPopulate.fromFileAsync(filePath).then(function (workbook) {

      const sht = workbook.sheet("Pipe Wall Thickness");
      const usedRange = sht.usedRange();
      const values = usedRange.value();

      resolve(values);

    });
  })
}

const mapSeries = async (iterable, action) => {

  var arr = [];

  for (const x of iterable) {
    arr = arr.concat(await action("C:\\repos\\combine-data-files\\inputs\\" + x))
  }

  return arr;

}

function compileDataFiles (dir) {

  // get list of all files to compile
  var fileList = fs.readdirSync(dir);

  // loop through files and combine data
  mapSeries(fileList, getXlsxData).then(function (res) {

    // convert array to json
    var data = JSON.parse(JSON.stringify(res));

    // output array to csv file
    fsops.outputToCsv(config.outputPath + "\\output.csv", data);

  })

  return ;

}

var config = {
  "inputPath": "C:\\repos\\combine-data-files\\inputs",
  "outputPath": "C:\\repos\\combine-data-files\\outputs"
}

compileDataFiles(config.inputPath);
