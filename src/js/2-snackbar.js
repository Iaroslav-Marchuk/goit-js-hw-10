import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const delay = document.querySelector('input[name="delay"]');
const radios = document.querySelectorAll('input[name="state"]');
const submit = document.querySelector('button[type="submit"]');

let delayValue = 0;
let radioValue;

delay.addEventListener('input', () => {
    delayValue = Number(delay.value);
    
 });


radios.forEach(radio => {
    radio.addEventListener('change', () => {
        radioValue = radio.value;
    });

    if (radio.checked) {
        radioValue = radio.value;
    }
});



submit.addEventListener('click', (event) => {
    event.preventDefault();
    createPromise(radioValue, delayValue);
});



function createPromise(selectedRadio, selectedDelay) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selectedRadio === "fulfilled") {
                resolve(`Fulfilled promise in ${selectedDelay}ms`);
            } else {
                reject(`Rejected promise in ${selectedDelay}ms`);
            }
        }, selectedDelay);
    })
        
    .then(value => {
        iziToast.success({
            icon: "",
            position: 'topRight',
            title: '✅',
            message: value,
        });
    })
    .catch(error => {
        iziToast.error({
            icon: "",
            position: 'topRight',
            title: '❌',
            message: error,
        });
    });
};


