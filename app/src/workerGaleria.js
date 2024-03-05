import { post } from '../vendor/http.js'

const formImage = document.getElementById("formImage");
const inputImage = document.getElementById("inputImage");
const imageListButton = document.getElementById("imageListButton");
const imageContainer = document.getElementById("imageContainer");
const sugerenciasWorker = document.getElementById("sugerenciasWorker");
const sugerenciasClient = document.getElementById("sugerenciasClient");
let imagenLoaded = document.getElementById("imagenLoaded");
let submitInputButton = document.getElementById("submitInputButton");
const inputs = document.querySelectorAll('.dataImage');
let workerInput = document.getElementById('workerInput');
let clientInput = document.getElementById('clientInput');
submitInputButton.style.display = 'none';
const fileReader = new FileReader();


inputs.forEach(element => {
    element.addEventListener('input', e => {
        if (e.target.id == 'clientInput') {
            // clientValue = e.target.value;
            peticionSugerencias(e.target.value, sugerenciasClient, clientInput)
        }
        if (e.target.id == 'workerInput') {
            // workerValue = e.target.value;
            peticionSugerencias(e.target.value, sugerenciasWorker, workerInput)
        }
    });
});

function peticionSugerencias(value, sugerenciaId, inputId) {
    post('http://localhost:3999/sugerenciasCorreos', 'json', 'application/json', {
        correo: value
    }).then(response => {
        mostrarSugerencias(response.existe, sugerenciaId, inputId);
    });
}

function clearInputs() {
    inputs.forEach(element => {
        element.value = '';
    });
}

inputImage.addEventListener('change', e => {
    fileReader.readAsDataURL(inputImage.files[0]);
    fileReader.addEventListener('load', e => {
        const dataBase64 = fileReader.result;
        const img = new Image();
        img.src = dataBase64;
        if (imagenLoaded.childNodes[1]) {
            imagenLoaded.childNodes[1].src = dataBase64;
        }
        else {
            imageData.style.display = 'block';
            imagenLoaded.appendChild(img);
        }
        imagenLoaded.childNodes[1].style.with = "250px"
        imagenLoaded.childNodes[1].style.height = "200px"
    })
})

formImage.addEventListener("submit", e => {
    e.preventDefault();
    post('http://localhost:3999/addJsonImage', 'json', 'application/json', {
        imagen: fileReader.result,
        worker: workerInput.value,
        client: clientInput.value
    }).then(response => {
        console.log(response);
        loadImages();
    });
})

imageListButton.addEventListener('click', e => {
    loadImages();
})

async function loadImages() {
    inputImage.value = '';
    workerInput.checked, clientInput.checked = false;
    clearInputs();
    imagenLoaded.innerHTML = '<div id="imagenLoaded"></div>'
    imageData.style.display = 'none';
    submitInputButton.style.display = 'none';
    imageContainer.innerHTML = `<div id="imageContainer"></div>`;
    post('http://localhost:3999/listarJsonImages', {
    }).then(response => {
        const imageUrls = JSON.parse(response);
        imageUrls.imagenesList.forEach(imageUrl => {            
            const imgElement = new Image();
            imgElement.src = imageUrl.imagen;
            imgElement.style.width = '350px'; // Adjust as needed
            imgElement.style.height = '200px';
            imageContainer.appendChild(imgElement);
        });
    });
}

function mostrarSugerencias(coincidencias, sugerenciaId, input) {
    submitInputButton.style.display = 'none';
    let correos = [];
    coincidencias.forEach(element => {
        correos.push(element.correo);
    });
    sugerenciaId.innerHTML = '';
    correos.forEach(palabra => {
        const elemento = document.createElement('a');
        elemento.href = '#';
        elemento.innerHTML = palabra + `<br>`;
        sugerenciaId.appendChild(elemento);
        elemento.addEventListener('click', e => {
            input.value = e.target.textContent;
            input.checked = true;            
            sugerenciaId.innerHTML = '';
            if (workerInput.checked && clientInput.checked) {
                submitInputButton.style.display = 'block';
            }
        })
    });
}








