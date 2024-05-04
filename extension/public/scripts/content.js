const axios = require('axios');

const article = document.body.innerText;
const name = window.location.href;

axios.post('/grade', {
  contents: name
})
.then((response) => {
  console.log(response);
}, (error) => {
  console.log(error);
});

console.log(article);
// api/grade
// send to server, feed into ML model and send back
// send name to server so it can be sent back to extension and autofilled in the form

const bad = false;

if (bad) {
  window.location.replace("http://www.pleasehelpme.study");
}