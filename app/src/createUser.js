import { get, post } from '../vendor/http.js'
import { validarCorreo } from "./validarCorreo.js";

//Dom Selectors
let nombre = document.getElementById('nombre');
let password = document.getElementById('password');
let correo = document.getElementById('correo');
let submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', () => {
	const validacion = validarCorreo(correo.value);
	let flag = true;
	for (const key in validacion) {
		if (validacion[key] == false) {
			console.log(key, validacion[key]);
			flag = false;
		}
	}
	if (flag) {
		post('http://localhost:3999/usuario', 'json', {
			nombre: nombre.value,
			password: password.value,
			correo: correo.value
		}).then(response => {
			console.log(response);
		});
		nombre.value = '';
		password.value = '';
		correo.value = '';
	}


});



