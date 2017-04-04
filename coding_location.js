var fs = require('fs'); 
var parse = require('csv-parse');
var node_geo = require('node-geocoder');

var csvData=[];
var latDict={};
var longDict={};
var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyDodbz5miqqfajSkHMV0PyJ_h89NrdMc24',
    formatter: null
};
var geocoder = node_geo(options);

var counter = 0;
var check_counter = 0;

var flag = true;

function getPlace(x) {
    geocoder.geocode(x)
        .then(function(res) {
             var place = res[0];
             //console.log(place['latitude']);
             latDict[x] = place['latitude'];
             //console.log(place['longitude']);
             longDict[x] = place['longitude']
             check_counter += 1;
        })
        .catch(function(err) {
             console.log(err);
             check_counter += 1;
        });
}

fs.createReadStream("VehicleDetails.csv")
    .pipe(parse({delimiter: ','}))	// parsed the data from VehicleDetails
    .on('data', function(csvrow) {
        var datum = csvrow[19];
        var x = datum.split(" - ");
        x = x[1]+" "+x[0];
        if (x in latDict) {
            console.log(latDict[x]);
            console.log(longDict[x]);
        } else {
            //console.log(datum);
            //console.log(x);
            setTimeout(getPlace, 100, x)
        }
        counter += 1;
        //csvrow contains data for this row.
        //push it to data for all rows.
        csvData.push(csvrow);        
    })
    .on('end',function() {
        //csvData contains data for all rows.
        //print out everything
        //console.log(csvData);
        flag = false;
    });

function update() {
    var i=0;
    var data = "";
    //console.log(csvData);
    csvData.forEach(function(csvrow) {
        if (i == 0) {
            csvrow += ["Latitude", "Longitude"];
            i+=1;
        } else {
            var datum = csvrow[19];
            var x = datum.split(" - ");
            x = x[1]+" "+x[0];
            csvrow += [latDict[x], longDict[x]]
        }
        data += csvrow+"\n";
    });
    fs.writeFile("works.csv", data, function(err) {
        console.log(err);
    });
    console.log("works.csv has been saved.")
}

while(flag != true) {
}
while(check_counter < counter)
update()
