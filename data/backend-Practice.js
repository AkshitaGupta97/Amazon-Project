
const xhr = new XMLHttpRequest(); // this creates a new HTTP message to send to backend, message = request

xhr.addEventListener('load', () =>{
    console.log(xhr.response)
}); // it takes two parameter : load, and function

xhr.open('GET', 'https://supersimplebackend.dev');

// to get response via URL Paths, each url gives different response
//xhr.open('GET', 'https://supersimplebackend.dev/hello');
//xhr.open('GET', 'https://supersimplebackend.dev/products/first');
//xhr.open('GET', 'https://supersimplebackend.dev/documentation');
//xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');

xhr.send();

//xhr.response // here response is undefined because it takes some time to fetch the request, 
// so we are using eventListener()

