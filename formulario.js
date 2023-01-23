//traendo  los campos 
//formBoleta
const formulario = document.getElementById('formBoleta');
const inputs = document.querySelectorAll('#formBoleta input');
//formFactura
const formularios = document.getElementById('formFactura');
const inputss = document.querySelectorAll('#formFactura input');
//modal
/* const formularioss = document.getElementById('modal');
const inputsss = document.querySelectorAll('#modal input'); */

//expreciones regulares 
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	firstName: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	lastName: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    address: /^[a-zA-Z0-9\_\ .\-]{4,40}$/,
	dni: /^\d{8,8}$/, // 7 a 14 numeros.
    address2: /^[a-zA-Z0-9\_\ .\-]{4,40}$/,
    ruc:/^\d{11,11}$/,
    businessName:  /^[a-zA-Z0-9\_\ .\-]{4,40}$/,
    /* nameLarge:/^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    emailLarge:/^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    dobLarge: /^\d{1,5}$/, // 7 a 14 numeros. */
}
//campos
const campos = {
	usuario: false,
	firstName: false,
    lastName: false,
    address: false,
    address2: false,
	dni: false,
    ruc: false,
    businessName: false,
   /*  nameLarge: false,
    emailLarge: false,
    dobLarge: false */

}

//casos de validaciones
const validarFormulario = (e) => {
	switch (e.target.name) {
        case "dni":
			validarCampo(expresiones.dni, e.target, 'dni');
		break;
		case "firstName":
			validarCampo(expresiones.firstName, e.target, 'firstName');
		break;
		case "lastName":
			validarCampo(expresiones.lastName, e.target, 'lastName');
		break;
        case "addressTicket":
			validarCampo(expresiones.address, e.target, 'address');
		break;
        case "ruc":
			validarCampo(expresiones.ruc, e.target, 'ruc');
		break;
        case "businessName":
			validarCampo(expresiones.businessName, e.target, 'businessName');
		break;
        case "address2":
			validarCampo(expresiones.address2, e.target, 'address2');
		break;
       /*  case "nameLarge":
			validarCampo(expresiones.nameLarge, e.target, 'nameLarge');
		break;
        case "emailLarge":
			validarCampo(expresiones.emailLarge, e.target, 'emailLarge');
		break;
        case "dobLarge":
			validarCampo(expresiones.dobLarge, e.target, 'dobLarge');
		break; */
	}
}
//validaciones para todos los campos
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

/////
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
inputss.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
/* inputsss.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
}); */




////botom
/* formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.dni && campos.firstName && campos.lastName && campos.address  ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
}); */