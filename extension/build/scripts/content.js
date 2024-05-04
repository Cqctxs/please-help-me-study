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
dataResolve();

waitForPageLoad.then(() => {
  setTimeout(() => {  
    const article = document.body.innerText;
    const name = window.location.href;
    console.log(article);
    dataResolve({ article, name });
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

  if (bad) {
    window.location.replace("http://www.pleasehelpme.study");
  }
});

sendData.then((data) => {
  
});