// console.log('client side java scipt added')

// fetch('http://puzzle.mead.io/puzzle')
// //code for handling the data you get from the API
// .then((response)=>{
   
// //transform the data into json file   
// response.json()
// //to get the parse data
// .then((data)=>{
//        console.log(data)
//    })
// })




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent =data.location;
                
                messageTwo.textContent = JSON.stringify(data.forecast)
        }
        })
    })
})
