import { get, post } from '../vendor/http.js'

const correo = document.getElementById('correo');
const submitBtn = document.getElementById('submitBtn');
const sugerencias = document.querySelector('#sugerencias');
const selectedUser = document.getElementById('selectedUser');
const selectedUserForm = document.getElementById('selectedUserForm');
selectedUserForm.style.display = 'none'

submitBtn.addEventListener('click', () => {
	post('http://localhost:3999/sugerenciasCorreos', 'json', {
		correo: correo.value
	}).then(response => {
		mostrarSugerencias(response.existe);
	});
});

correo.addEventListener('input', e => {
	selectedUserForm.style.display = 'none';
	selectedUser.innerHTML = '';
})
function mostrarSugerencias(coincidencias) {
	let correos = [];
	coincidencias.forEach(element => {
		correos.push(element.correo);
	});
	sugerencias.innerHTML = '';
	let selected = {};
	correos.forEach(palabra => {
		const elemento = document.createElement('a');
		elemento.href = '#';
		elemento.innerHTML = palabra + `<br>`;
		sugerencias.appendChild(elemento);
		elemento.addEventListener('click', e => {
			correo.value = e.target.textContent;
			selected = coincidencias.find(element => element.correo == e.target.textContent)
			sugerencias.innerHTML = '';
			selectedUserForm.style.display = 'block';
			const ul = document.createElement('ul');
			selectedUserForm.innerHTML = '';
			for (const key in selected) {
				if (key.slice(0, 1) != '_') {
					if (key != 'grupo') {
						const li = document.createElement('li');
						li.innerHTML = `${key} : ${selected[key]}`;
						ul.appendChild(li);
					}
					if (key == 'grupo') {
						let formSelectGrupo = document.createElement('form');
						formSelectGrupo.style.display = "none";
						formSelectGrupo.innerHTML = `
							<form id="selectGrupo" class="text-center border border-primary">								
								<div>
									<input class="radio" type="radio" name="grupo" id="worker" value="Worker"><label class="text-primary"
										for="worker">Worker</label>
									<input class="radio" type="radio" name="grupo" id="client" value="Client"><label class="text-primary"
										for="client">Client</label>
								</div>
							</form>`
						let li = document.createElement('li');
						li.innerHTML = `
						<li 
							class="border border-primary 
							btn-secondary btn-secondary:hover" dataValue="${selected[key]}"> 
							${key} : ${selected[key]} 
						</li>`;
						li.addEventListener('click', e => {
							if (formSelectGrupo.style.display == "block") {
								formSelectGrupo.style.display = "none"
								post(`http://localhost:3999/actUsuario`, 'json', {
									id: selected._id,
									correo: selected.correo,
									grupo: selected.grupo,
									nombre: selected.nombre,
									password: selected.password,
									tipo: selected.tipo
								}).then(response => {
									console.log(response);
									sugerencias.innerHTML = '';
								});
							} else {
								formSelectGrupo.style.display = "block"
							}
							let radios = document.querySelectorAll(".radio");
							radios.forEach(radio => {
								radio.addEventListener('click', e => {
									selected.grupo = e.target.attributes.value.value;
									li.textContent = `grupo : ${e.target.attributes.value.value}`;
								})
							});
						});
						ul.appendChild(li);
						ul.append(formSelectGrupo);
					}
				}
			}
			selectedUserForm.appendChild(ul);
			selectedUserForm.style.color = 'white'
		})
	});
}