var maquina = 'http://127.0.0.1:8000';
// http://karbonoaztarna.herokuapp.com
// http://huelladecarbono.ddns.net
// http://127.0.0.1:8000
$(document).ready(function () {

    // login botoia programatu
    $('#sartu').on("click", function (event) {
        event.preventDefault();
        // alert("submit sakatua");
        login($("#loginForm").serialize());
        //probaJson($("#loginForm").serialize());

    });

    $('.irten').on("click", function(event){
        //TODO loggouta egin ajaxez

        //login orria kargatu
        $('#email').val('');
        $('#password').val('');
    	$("#eraikinZerrenda").empty();
    	$("#estudioZerrenda").empty();
        $('#token').val("");
        $.mobile.changePage("#login");
        $.mobile.changePage("#pageLogout");
    })


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
            	$("#eraikinZerrenda").empty();
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


	//alert( maquina + '/api/login');
	//alert(datuak);
    $.ajax({
        type: 'POST',
        url: maquina + '/api/login',
        data: datuak
    })
        .done(function (responseText) {
            // Triggered if response status code is 200 (OK)
            //alert(responseText.data.api_token);
            if (responseText.data) {
                $('#token').val(responseText.data.api_token);
                $.mobile.changePage("#eraikinOrria");
            } else {
                $.mobile.changePage("#pageError");
            }
        })
        .fail(function (jqXHR, status, error) {
            // Triggered if response status code is NOT 200 (OK)
        	alert(jqXHR.responseText);
            $.mobile.changePage("#pageError");
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
        url: urlDeia,
        headers: {
            'Authorization': 'Bearer ' + $('#token').val()
        }
    })
        .done(function (responseText) {
            // Triggered if response status code is 200 (OK)
            //alert("done");
            $("#estudioZerrenda").empty();
            for (i = 0; i < responseText.length; i++) {
                var estudioa = responseText[i];
                if(estudioa.carbon_footprint != null){
                    $('#estudioZerrenda').append(
                        '<li>' +
                        '<a class="estudio" data-idbuilding="'+ estudioa.building_id +'" data-id="' + estudioa.id + '" href="#alkantzeak">' +
                        estudioa.year +
                        '</a>' +
                        '</li>');
                }

            }
            $("#estudioZerrenda").listview().listview('refresh');

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
    var eraikinId = $(hau).data('idbuilding');
    var alkanzeId = $(hau).data('id');
    var urlDeia = maquina + '/api/alcances/' + eraikinId;
    var datuakPantailaratu = function (estudioa) {
        $('#urtea').html("Urtea " + estudioa.year);
        //alkace1
        $('#gas-natural1').val(estudioa.a1_gas_natural_kwh);
        $('#gas-natural2').val(estudioa.a1_gas_natural_nm3);
        $('#refrigerantes').val(estudioa.a1_refrigerantes);
        $('#recarga-gas-refrigerantes').val(estudioa.a1_recarga_gases_refrigerantes);
        //alcance2
        $('#electricidad').val(estudioa.a2_electricidad_kwh);
        //alcance3
        $('#agua-potable').val(estudioa.a3_agua_potable_m3);
        $('#consumo-papel').val(estudioa.a3_papel_carton_consumo_kg);
        $('#residuos-papel').val(estudioa.a3_papel_carton_residuos_kg);
        $('#factor').val(estudioa.a3_factor_kwh_nm3);

    };
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
            for (i = 0; i < responseText.length; i++) {
                var estudioa = responseText[i];
                if(estudioa.id === alkanzeId){
                    datuakPantailaratu(estudioa);
                }
            }
            $.mobile.changePage("#alkantzeak");
        })
        .fail(function (jqXHR, status, error) {
            // Triggered if response status code is NOT 200 (OK)
            alert('error');
        });
}

