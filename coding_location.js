var fs = require('fs'); 
var parse = require('csv-parse');

var csvData=[];
var latDict={};
var longDict={};
fs.createReadStream("VehicleDetails.csv")
    .pipe(parse({delimiter: ','}))	// parsed the data from VehicleDetails
    .on('data', function(csvrow) {
        console.log(csvrow[19]);
        //csvrow contains data for this row.
        //push it to data for all rows.
        csvData.push(csvrow);        
    })
    .on('end',function() {
        //csvData contains data for all rows.
        //print out everything
        //console.log(csvData);
    });
