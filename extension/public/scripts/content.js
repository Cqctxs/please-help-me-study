const waitForPageLoad = new Promise((resolve) => {
  if (document.readyState === 'complete') {
    resolve();
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') {
        resolve();
      }
    });
  }
});

let dataResolve;
let dataReject;
const sendData = new Promise((resolve, reject) => {
  dataResolve = resolve;
  dataReject = reject;
});

waitForPageLoad.then(() => {
  setTimeout(() => {  
    const prompt = document.body.innerText;
    const source = window.location.href;
    console.log(prompt);
    dataResolve({ prompt, source });
  }, 1000);
  
  // axios.post('/grade', {
  //   contents: name
  // })
  // .then((response) => {
  //   console.log(response);
  // }, (error) => {
  //   console.log(error);
  // });

  // api/grade
  // send to server, feed into ML model and send back
  // send name to server so it can be sent back to extension and autofilled in the form

  const bad = false;

  if (bad !== undefined && bad === true) {
    window.location.replace("http://www.pleasehelpme.study");
  }
});

sendData.then((data) => {
  console.log("sent", JSON.stringify({ prompt: data.prompt, source: data.source}));
  fetch("http://localhost:8080/api/grade", {
  method: "POST",
  body: JSON.stringify({
    prompt: data.prompt,
    source: data.source
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
});