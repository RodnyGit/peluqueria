import { get, post, postImage } from '../vendor/http.js'

const formImage = document.getElementById("formImage");
const inputImage = document.getElementById("inputImage");
const submitInputButton = document.getElementById("submitInputButton");
let imagenLoaded = document.getElementById("imagenLoaded");

const fileReader = new FileReader();

console.log(inputImage.files);

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



// const objeto = {
//     nombreWorker: 'req.body.nombreWorker',
//     nombreClienta: 'req.body.nombreClienta',
//     fecha: "req.body.fecha",
//     data: dataBase64
// }

formImage.addEventListener("submit", e => {
    e.preventDefault();
    const file = inputImage.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:3999/addGaleria', {
        method: 'POST',
        body: file
    }).then(response => {
        console.log(response);
    });
    // postImage('http://localhost:3999/addGaleria', 'image/png', {
    //     body: file
    // }).then(response => {
    //     console.log(response);
    // });




})





