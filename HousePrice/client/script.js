// getting selected bathroom val
function getbathVal(){
    var bath_val = document.getElementsByName("bathOpt");
    for(var i in bath_val){
        if(bath_val[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1; // for invalid value
}

// getting selected BHK val
function getbhkVal(){
    var bhk_val = document.getElementsByName("bhkOpt");
    for(var i in bhk_val){
        if(bhk_val[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1; // for invalid value
}

// estimating values
function onClickEstimate(){
    console.log("going in the estimate()")
    var sqft = document.getElementById("sqft").value;
    var bhk = getbhkVal();
    var bath = getbathVal();
    var location = document.getElementById("loc_select").value;
    var estPrice = document.getElementById("est_price");
    // var url = "http://127.0.0.1:5000/predict_home_price";
    var url = "/api/predict_home_price"; // using this while using nginx server
    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bath,
        location: location
    },function(data, status){
        estPrice.innerHTML = "The predicted price is around: " + data.estimated_price.toString()+" Lakh rupees"
        if (estPrice.style.display === "none") {
            estPrice.style.display = "block";
        } 
    });
}

function onPageLoad(){
    // var url = "http://127.0.0.1:5000/get_loc_name";
    var url = "/api/get_loc_name"; // using this while using nginx server
    $.get(url, function(data, status){
        console.log("got response for get_location_names request");
        if(data) {
            var loc = data.locations;
            var loc_select = document.getElementById("loc_select");
            $('#loc_select').empty();
            for(var i in loc){
                var opt = new Option(loc[i]);
                $('#loc_select').append(opt)
            }
        }
    });
}

window.onload = onPageLoad();