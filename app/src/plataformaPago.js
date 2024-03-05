const inputCard = document.querySelector("#inputCard");
const inputDate = document.querySelector("#inputDate");
const inputCVV = document.querySelector("#inputCVV");

const maskNumber = '####-####-####-####';
const maskDate = '##/##';
const maskCVV = '###';

let current = "";
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

inputCard.addEventListener('keydown', e => {
    if (e.key == 'Tab') {
        return;
    }
    e.preventDefault();//no queremos que keydown funcione de forma estandar
    handleInput(maskNumber, e.key, cardNumber);//esta es la nueva keydown
    inputCard.value = cardNumber.join("");
})

inputDate.addEventListener('keydown', e => {
    if (e.key == 'Tab') {
        return;
    }
    e.preventDefault();//no queremos que keydown funcione de forma estandar
    handleInput(maskDate, e.key, dateNumber);//esta es la nueva keydown
    inputDate.value = dateNumber.join("");
})

inputCVV.addEventListener('keydown', e => {
    if (e.key == 'Tab') {
        return;
    }
    e.preventDefault();//no queremos que keydown funcione de forma estandar
    handleInput(maskCVV, e.key, cvvNumber);//esta es la nueva keydown
    inputCVV.value = cvvNumber.join("");
})

function handleInput(mask, key, arr) {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (key == 'Backspace' && arr.length > 0) {
        arr.pop();
        return;
    }
    if (numbers.includes(key) && arr.length + 1 <= mask.length) {
        if (mask[arr.length] == "-" || mask[arr.length] == "/") {
            arr.push(mask[arr.length], key);
        } else {
            arr.push(key);
        }
    }
}

document.getElementById('payment-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const cardNumber = document.getElementById('inputCard').value;
    const expiryDate = document.getElementById('inputDate').value;
    const cvv = document.getElementById('inputCVV').value;

    console.log(cardNumber);
    console.log(expiryDate);
    console.log(cvv);

    const paymentMessage = document.getElementById('payment-message');
    paymentMessage.textContent = 'Procesando el pago...';

    try {
        // Aquí iría la lógica para enviar los detalles del pago al servidor Node.js y procesar el pago
        // Por ejemplo, puedes hacer una solicitud POST utilizando fetch() para enviar los datos del formulario al servidor.
        // Una vez que el pago se haya procesado con éxito en el servidor, puedes mostrar un mensaje de confirmación al usuario.
        // Ejemplo: 
        // const response = await fetch('/procesar-pago', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ cardNumber, expiryDate, cvv })
        // });
        // const data = await response.json();
        // paymentMessage.textContent = data.message;

        paymentMessage.textContent = 'Pago procesado con éxito. ¡Gracias por su compra!';
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        paymentMessage.textContent = 'Se produjo un error al procesar el pago. Por favor, inténtelo de nuevo más tarde.';
    }
});


