import { get, post } from '../vendor/http.js'

const formImage = document.getElementById("formImage");
const inputImage = document.getElementById("inputImage");
const submitInputButton = document.getElementById("submitInputButton");
let imagenLoaded = document.getElementById("imagenLoaded");

const fileReader = new FileReader();

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
            imagenLoaded.appendChild(img);
        }
        imagenLoaded.childNodes[1].style.with = "250px"
        imagenLoaded.childNodes[1].style.height = "200px"
    })
})

let archivo = FormData({
    nombreWorker: 'req.body.nombreWorker',
    nombreClienta: 'req.body.nombreClienta',
    fecha: "req.body.fecha",
    data: dataBase64
})

formImage.addEventListener("submit", e => {
    e.preventDefault();
    fileReader.readAsDataURL(inputImage.files[0]);
    fileReader.addEventListener('load', e => {
        const dataBase64 = Array(fileReader.result);
        console.log(dataBase64);
        post(`http://localhost:3999/addGaleria`, 'json', {
            nombreWorker: 'req.body.nombreWorker',
            nombreClienta: 'req.body.nombreClienta',
            fecha: "req.body.fecha",
            data: dataBase64
        }).then(response => {
            console.log(response);
        });
    })


})





