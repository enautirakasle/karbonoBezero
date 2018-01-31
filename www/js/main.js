$(document).ready(function() {

	// login botoia programatu
	$('#sartu').on("click", function(event) {
		event.preventDefault();
		// alert("submit sakatua");
		//login($("#loginForm").serialize());
		probaJson($("#loginForm").serialize());
	});

	//edifizio bag aukeratzen denean ejecutatu beharrekoa
	$('.edif').click(function(e) {
		//e.preventDefault();
		alkanzeOrriaBete(this);
		return false;
	}); //fin .edif

}); //ready bukaera


// eraikinen orria erakutsi aurretik zerbait egiteko proba bat
$("#eraikinOrria").on(
	"pagebeforeshow",
	function(event) {
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
		// alert("kargatu aurrekoa");
		var arraia = JSON.parse(myJSON);
		for (i = 0; i < arraia.length; i++) {
			var pertsona = arraia[i];
			// alert(pertsona.name);
			$('#eraikinZerrenda').append(
				'<li><a href="?id=' + (i + 10) + '#alkantzeak">' +
				pertsona.name + ' ' + pertsona.city +
				'</a></li>').listview('refresh');
		}
	});


// alkantzeen orria kargatu aurretik proba batzuk egiten
//momentuz ez da ezertarako
/*
$('#alkantzeak').on(
	'pagebeforeshow',
	function(event) {
		Console.log(decode);
		// TODO erakinarenDatuak.php egiteke dago
		$.post("https://enautirakasle.000webhostapp/eraikinarenDatuak.php",
			datuak,
			function(data) {
				// TODO zerbitzariaren erantzuna doa hemen

			});
	});
	*/

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

//clikatu den eraikinetik bere id-arekin alkatzeen orria bete
function alkanzeOrriaBete(hau) {
	console.log($(hau).data('id'));
}

//soniak egindako laravel proiekturen erantzuna jasotzen dela ikusteko
function probaJson(datuak) {
	// alert(datuak);
	$.post("https://warm-lowlands-97387.herokuapp.com/api/buildingsProba", datuak,
		function(data) {
			console.log(data);
			var jasotakoak = data;
			alert(jasotakoak);
		});
}