console.log('Client side js is loaded')

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
}).catch((error) => {
    console.error(error);
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msgOne');
const messageTwo = document.querySelector('#msgTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageTwo.textContent = data.error;
                return console.log(data.error);
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            console.log(data.location);
            console.log(data.forecast);
        })
    }).catch((error) => {
        console.error(error);
    }) 
})
