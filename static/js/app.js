function populateTable(dataArray) {
//popultate table onto page
// Get a reference to the table
  d3.select("table").append("tbody");
  var tbody = d3.select("tbody");
  dataArray.forEach(function(sighting) {
  //console.log(sighting);
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(function([key, value]) {
    //console.log(key, value);
      if (key == 'state' || key == 'country' ){
        value = value.toUpperCase();
      }
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
  return;
};

//remove old data
function clearTable(){
  console.log("clearing table");
  d3.select("tbody").remove();
  return;
};

//filter data - accepts a dict of param strings
function filterData(vals) {
  var resultArray = [];
  for (i=0; i<data.length; i++ ){
    _sigting = data[i];
    if (
      (vals["datetime"] == "" || vals["datetime"] == _sigting["datetime"]) &&
      (vals["city"] == "" || vals["city"].toUpperCase() == _sigting["city"].toUpperCase()) &&
      (vals["state"] == "" || vals["state"].toUpperCase() == _sigting["state"].toUpperCase()) &&
      (vals["country"] == "" || vals["country"].toUpperCase() == _sigting["country"].toUpperCase()) &&
      (vals["shape"] == "" || vals["shape"] == _sigting["shape"])     
    ) 
      resultArray.push(_sigting);
  }
  return resultArray;
};

//read params for filtering
function readParams() {
  var dateInput = d3.select("#datetime").property("value");
  var cityInput = d3.select("#city").property("value");
  var countryInput = d3.select("#country").property("value");
  var stateInput = d3.select("#state").property("value");
  var shapeInput = d3.select("#shape").property("value");

  filterParams = {
    datetime: dateInput,
    city: cityInput,
    state: stateInput,
    country: countryInput,
    shape: shapeInput
  };
  return(filterParams)
}

//initial populate default data
populateTable(data);

//Select the submit button
var submit = d3.select("#filter-btn");
submit.on('click', function() {
  d3.event.preventDefault();
  filterParams = readParams();
  console.log(filterParams);
  clearTable();
  populateTable(filterData(filterParams));
});


