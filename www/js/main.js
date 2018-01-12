$(document).ready(function() {
	// console.log( "ready!" );

	// login botoia programatu
	$('#sartu').on("click", function(event) {
		event.preventDefault();
		// alert("submit sakatua");
		login($("#loginForm").serialize());
	});

});

// eraikinen orria erakutsi aurretik zerbait egiteko proba bat
$("#eraikinOrria").on(
		"pagebeforeshow",
		function(event) {
			var myObj = [ {
				"name" : "Mikel",
				"age" : 33,
				"city" : "Ondarroa"
			}, {
				"name" : "John",
				"age" : 31,
				"city" : "New York"
			} ];
			var myJSON = JSON.stringify(myObj);
			// alert("kargatu aurrekoa");
			var arraia = JSON.parse(myJSON);
			for (i = 0; i < arraia.length; i++) {
				var pertsona = arraia[i];
				// alert(pertsona.name);
				$('#eraikinZerrenda').append(
						'<li><a href="?id=' + (i + 10) + '#alkantzeak">'
								+ pertsona.name + ' ' + pertsona.city
								+ '</a></li>').listview('refresh');
			}

		});

// alkantzeen orria kargatu aurretik eraikinaren idearekin bere datuak lortu eta
// formularioa bete
$('#alkantzeak').on(
		'pagebeforeshow',
		function(event) {
			Console.log(decode);
			// TODO erakinarenDatuak.php egiteke dago
			$.post("https://enautirakasle.000webhostapp/eraikinarenDatuak.php",
					datuak, function(data) {
						// TODO zerbitzariaren erantzuna doa hemen

					});
		});

/*
 * logina egin eta zabaldu beharreko horria kargatuko du.
 */
function login(datuak) {
	// alert(datuak);
	$.post("https://enautirakasle.000webhostapp.com/login.php", datuak,
			function(data) {
				if (data === "ok") {
					$.mobile.changePage("#eraikinOrria");
				} else {
					$.mobile.changePage("#pageError");
				}
			});

}