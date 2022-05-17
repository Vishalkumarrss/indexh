function getBathValue() {
    // Get no of bathrooms
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
      if (uiBathrooms[i].checked) {
        return parseInt(i) + 1;
      }
    }
    return -1; // Invalid Value
  }
  
function getBHKValue() {
    // Get no of BHK's
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
      if (uiBHK[i].checked) {
        return parseInt(i) + 1;
      }
    }
    return -1; // Invalid Value
}
  
function onClickedEstimatePrice() {
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");
  
 var  url = "http://127.0.0.1:5000/predict_home_price";
    //var url ="/api/predict_home_price";
  $.post( 
      url,
      {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value,
      },
      function (data, status) {
        estPrice.innerHTML =
          "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      }
    );
  }
  
function onPageLoad() {
  console.log("document load");
  var url = "http://127.0.0.1:5000/get_location_names";
    //var url = "/api/get_location_names";
  $.get(url, function (data, status) {
    console.log("get response for get_location_names request ");
    if (data) {
      locations = data.locations;
       uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      for ( i in locations) {
            opt = new Option(locations[i]); 
           $("#uiLocations").append(opt);
      }
    }
  });
}
  
  window.onload = onPageLoad;