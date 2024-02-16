import { get, post } from '../vendor/http.js'

//Dom Selectors
let nombreLogin = document.getElementById('nombreLogin');
let passwordLogin = document.getElementById('passwordLogin');
let correoLogin = document.getElementById('correoLogin');
let submitBtnLogin = document.getElementById('submitBtnLogin');
let showState = document.getElementById('showState');

function login(data) {
	console.log('logueando ' + data);
}
submitBtnLogin.addEventListener('click', () => {
	post('http://localhost:3999/login', 'json', {
		nombre: nombreLogin.value,
		password: passwordLogin.value,
		correo: correoLogin.value

	}).then(response => {
		console.log(response);
	});
	//#region axios
	// axios
	// 	.post('/login', {
	// 		nombre: nombreLogin.value,
	// 		password: passwordLogin.value,
	// 		correo: correoLogin.value
	// 	})
	// 	.then((response) => {
	// 		console.log(response.data);
	// 		if (response.data.user) {
	// 			axios
	// 				.post('/distpatch', {
	// 					type: 'logUser',
	// 					payload: { value: response.data.user }
	// 				})
	// 				.then(() => {
	// 					axios.get('/getState').then((res) => {
	// 						if (res.data.state.value) {
	// 							console.log(res.data.state.value);
	// 						}
	// 					});
	// 				});
	// 		}
	// 	});
	//#endregion
	nombreLogin.value = '';
	passwordLogin.value = '';
	correoLogin.value = '';
});
