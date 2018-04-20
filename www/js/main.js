var maquina = 'http://127.0.0.1:8000';
// http://karbonoaztarna.herokuapp.com
// http://huelladecarbono.ddns.net
$(document).ready(function () {

    // login botoia programatu
    $('#sartu').on("click", function (event) {
        event.preventDefault();
        // alert("submit sakatua");
        login($("#loginForm").serialize());
        //probaJson($("#loginForm").serialize());

    });

    //edifizio bat aukeratzen denean ejecutatu beharrekoa


}); //ready bukaera


// eraikinen orria erakutsi aurretik zerbait egiteko proba bat
$("#eraikinOrria").on(
    "pagebeforeshow",
    function (event) {
        $.ajax({
            type: 'GET',
            //http://karbonoaztarna.herokuapp.com/api/buildings
            url: maquina + '/api/buildings',
            headers: {
                'Authorization': 'Bearer ' + $('#token').val()
            }
        })
            .done(function (responseText) {
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
                //edifizio bag aukeratzen denean ejecutatu beharrekoa
                $('.edif').click(function (e) {
                    //e.preventDefault();
                    egindakoNeurketakZerrendatu(this);
                    return false;
                });

            })
            .fail(function (jqXHR, status, error) {
                // Triggered if response status code is NOT 200 (OK)
                alert('error');
            });

    });


/*
 * logina egin eta zabaldu beharreko horria kargatuko du.
 */
function login(datuak) {


    $.ajax({
        type: 'POST',
        url: maquina + '/api/login',
        data: datuak
    })
        .done(function (responseText) {
            // Triggered if response status code is 200 (OK)
            alert("done");
            if (responseText.data) {
                $('#token').val(responseText.data.api_token);
                $.mobile.changePage("#eraikinOrria");
            } else {
                $.mobile.changePage("#pageError");
            }
        })
        .fail(function (jqXHR, status, error) {
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

function probaJson(datuak) {
    $.post("https://warm-lowlands-97387.herokuapp.com/api/buildingsProba", datuak,
        function (data) {
            alert(data.name + "\n" + data.description + "\n" + data.postcode + "\n" + data.address_with_number);
        });
}

function egindakoNeurketakZerrendatu(hau) {
    //console.log($(hau).data('id'));
    var eraikinId = $(hau).data('id');
    var urlDeia = maquina + '/api/alcances/' + eraikinId;
    //var apiTokena = $('#token').val();
    //console.log(apiTokena);
    $.ajax({
        type: 'GET',
        //http://karbonoaztarna.herokuapp.com/api/buildings
        url: urlDeia,
        headers: {
            'Authorization': 'Bearer ' + $('#token').val()
        }
    })
        .done(function (responseText) {
            // Triggered if response status code is 200 (OK)
            alert("done");
            // Triggered if response status code is 200 (OK)
            //alert("done");
            for (i = 0; i < responseText.length; i++) {
                var estudioa = responseText[i];
                if(estudioa.carbon_footprint != null){
                    $('#estudioZerrenda').append(
                        '<li>' +
                        '<a class="estudio" data-id="' + estudioa.id + '" href="#alkantzeak">' +
                        estudioa.id + ' (' + estudioa.carbon_footprint + ' ' +
                        estudioa.building_id +
                        ')</a>' +
                        '</li>');
                }

            }
            //edifizio bag aukeratzen denean ejecutatu beharrekoa
            $('.estudio').click(function (e) {
                //e.preventDefault();
                alkanzeOrriaBete(this);
                return false;
            });
            $.mobile.changePage("#estudioOria");



        })
        .fail(function (jqXHR, status, error) {
            // Triggered if response status code is NOT 200 (OK)
            alert('error');
        });
}

//clikatu den eraikinetik bere id-arekin alkatzeen orria bete
function alkanzeOrriaBete(hau) {
    console.log($(hau).data('id'));
    var eraikinId = $(hau).data('id');
    var urlDeia = maquina + '/api/buildings/ ' + eraikinId;
    var apiTokena = $('#token').val();
    console.log(apiTokena);
    $.ajax({
        type: 'GET',
        //http://karbonoaztarna.herokuapp.com/api/buildings
        url: urlDeia,
        headers: {
            'Authorization': 'Bearer ' + $('#token').val()
        }
    })
        .done(function (responseText) {
            // Triggered if response status code is 200 (OK)
            alert("done");


        })
        .fail(function (jqXHR, status, error) {
            // Triggered if response status code is NOT 200 (OK)
            alert('error');
        });
}

