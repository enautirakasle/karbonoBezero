$(document).ready(function() {

	// login botoia programatu
	$('#sartu').on("click", function(event) {
		event.preventDefault();
		// alert("submit sakatua");
		login($("#loginForm").serialize());
		//probaJson($("#loginForm").serialize());
		
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
        $.ajax({
            type: 'GET',
			//http://karbonoaztarna.herokuapp.com/api/buildings
            url:  'http://127.0.0.1:8000/api/buildings',
            headers: {
                'Authorization': 'Bearer ' + $('#token').val()
            }
        })
            .done( function (responseText) {
                // Triggered if response status code is 200 (OK)
                //alert("done");
                for (i = 0; i < responseText.length; i++) {
                    var eraikina = responseText[i];

                    $('#eraikinZerrenda').append(
                        '<li>' +
						'<a class="edif" data-id="' + eraikina.id + '" href="#alkantzeak">' +
						eraikina.name + ' (' + eraikina.address_with_number +
                        ')</a>' +
						'</li>')
						.listview('refresh');
                }

            })
            .fail( function (jqXHR, status, error) {
                // Triggered if response status code is NOT 200 (OK)
                alert('error');
            });
		/*
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
		}*/
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
	
	

	

	 $.ajax({
         type: 'POST',
         url:  'http://127.0.0.1:8000/api/login',
         data: datuak
      })
         .done( function (responseText) {
            // Triggered if response status code is 200 (OK)
            alert("done");
             if (responseText.data) {
             	$('#token').val(responseText.data.api_token);
				 $.mobile.changePage("#eraikinOrria");
			 } else {
				 $.mobile.changePage("#pageError");
			 }
         })
         .fail( function (jqXHR, status, error) {
            // Triggered if response status code is NOT 200 (OK)
             $.mobile.changePage("#pageError");
         });
//         .always( function() {
//            // Always run after .done() or .fail()
//           alert("beti");
//         });
	
//	$.post("https://enautirakasle.000webhostapp.com/login.php", datuak,
//		function(data) {
//			if (data === "ok") {
//			alert("if");
//			} else {
//				alert("else");
//			}
//		});
}

function probaJson(datuak){
	$.post("https://warm-lowlands-97387.herokuapp.com/api/buildingsProba", datuak,
		function(data) {
				alert(data.name + "\n" + data.description + "\n" + data.postcode + "\n" + data.address_with_number);
		});
}

//clikatu den eraikinetik bere id-arekin alkatzeen orria bete
function alkanzeOrriaBete(hau) {
	console.log($(hau).data('id'));
}

