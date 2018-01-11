$(document).ready(function() {
  //console.log( "ready!" );

  //login botoia programatu
  $('#sartu').on("click", function(event) {
    event.preventDefault();
    //alert("submit sakatua");
    login($("#loginForm").serialize());
  });

});


$("#azterketaOrria").on("pagebeforeshow", function(event) {
  var myObj = [{
    "name": "Mikel",
    "age": 33,
    "city": "Ondarroa"
  }, {
    "name": "John",
    "age": 31,
    "city": "New York"
  }];
  var myJSON = JSON.stringify(myObj);
  //alert("kargatu aurrekoa");
  var arraia = JSON.parse(myJSON);
 for (i = 0; i < arraia.length; i++) {
   var pertsona = arraia[i];
    //alert(pertsona.name);
   $('#azterketaZerrenda').append('<li><a>' + pertsona.name + ' ' + pertsona.city + '</a></li>').listview('refresh');
} 

});

/*
logina egin eta zabaldu beharreko horria kargatuko du.
*/
function login(datuak) {
  // alert(datuak);
  $.post("https://enautirakasle.000webhostapp.com/login.php", datuak, function(data) {
    if (data === "ok") {
      $.mobile.changePage("#azterketaOrria");
    } else {
      $.mobile.changePage("#pageError");
    }
  });

}