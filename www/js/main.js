/*
logina egin eta zabaldu beharreko horria kargatuko du.
*/
function login(datuak) {
  // alert(datuak);
  $.post("https://enautirakasle.000webhostapp.com/login.php", datuak, function(data) {
    if (data === "ok") {
      $.mobile.changePage("#azterketak");
    } else {
      $.mobile.changePage("#pageError");
    }
  });

}

$(document).ready(function() {
  //console.log( "ready!" );

  //login botoia programatu
  $('#sartu').on("click", function(event) {
    event.preventDefault();
    //alert("submit sakatua");
    login($("#loginForm").serialize());
  });




});