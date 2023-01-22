function autocompletarBoleta() {
    var cliente = [
        [], 
        [], 
        [], 
        [],
        [],
        []
    ];

    cliente[0]['nombre'] = 'jaime ivan';
    cliente[0]['apellido'] = 'carrasco taipe';
    cliente[0]['dni'] = '60014426';
    cliente[0]['direccion'] = 'Av. Diamante';

    cliente[1]['nombre'] = 'flor cintia';
    cliente[1]['apellido'] = 'pareja arredondo';
    cliente[1]['dni'] = '85452441';
    cliente[1]['direccion'] = 'Av. Oro';

    cliente[2]['nombre'] = 'alonzo';
    cliente[2]['apellido'] = 'huamani sanchez';
    cliente[2]['dni'] = '96587412';
    cliente[2]['direccion'] = 'Av. Plata';

    cliente[3]['nombre'] = 'jairo';
    cliente[3]['apellido'] = 'muñoz miranda';
    cliente[3]['dni'] = '12365894';
    cliente[3]['direccion'] = 'Av. Bronce';

    cliente[4]['nombre'] = 'ander';
    cliente[4]['apellido'] = 'ramos hurtado';
    cliente[4]['dni'] = '1452369';
    cliente[4]['direccion'] = 'Av. Hierro';

    cliente[5]['nombre'] = 'Nymeria';
    cliente[5]['apellido'] = 'walalachita';
    cliente[5]['dni'] = '85236541';
    cliente[5]['direccion'] = 'Av. Papel mojado';

    var dni = document.getElementById("dni").value;
    console.log(cliente[0]['dni']);

    for (var i=0;  i< 6; i++) {
        if (dni == String(cliente[i]['dni'])) 
        {
            document.getElementById("nombre").value = cliente[i]['nombre'];
            document.getElementById("apellido").value = cliente[i]['apellido'];
            document.getElementById("direccion").value = cliente[i]['direccion'];
        }
        else{
            console.log("no se encontro")
        }
    }
    
}

function autocompletarFactura() {
    var empresa = [
        [], 
        [], 
        [], 
        [],
        [],
        []
    ];

    empresa[0]['ruc'] = '10164120517';
    empresa[0]['razon_social'] = 'SELVA INDUSTRIAS MELITA E.I.R.L.';
    empresa[0]['direccion_empresa'] = 'Bo. Arconte';

    empresa[1]['ruc'] = '54236987451';
    empresa[1]['razon_social'] = 'AGRINOVA DEL PERU S.R.L';
    empresa[1]['direccion_empresa'] = 'Av. Heraldo';

    empresa[2]['ruc'] = '12563489521';
    empresa[2]['razon_social'] = 'AGROSORIA E.I.R.L';
    empresa[2]['direccion_empresa'] = 'Jr. Leyenda';

    empresa[3]['ruc'] = '52136478954';
    empresa[3]['razon_social'] = 'AUSANGATE TRAVEL SOCIEDAD COMERCIAL DE RESPONSABILIDAD LIMITADA';
    empresa[3]['direccion_empresa'] = 'Urb. Ancestral';

    empresa[4]['ruc'] = '12356987412';
    empresa[4]['razon_social'] = 'BENDICIÓN DE DIOS L&O';
    empresa[4]['direccion_empresa'] = 'Av. Guardian';

    empresa[5]['ruc'] = '52032145620';
    empresa[5]['razon_social'] = 'CADENA DE BOTICAS LA SANTA CRUZ S.A.C.';
    empresa[5]['direccion_empresa'] = 'Bo. Inmortal';


    var ruc = document.getElementById("ruc").value;
    
    for (var i=0;  i< 6; i++) {
        if (ruc == String(empresa[i]['ruc'])) 
        {
            document.getElementById("razon_social").value = empresa[i]['razon_social'];
            document.getElementById("direccion_empresa").value = empresa[i]['direccion_empresa'];
        }
        else{
            console.log("no se encontro")
        }
    }
    
}