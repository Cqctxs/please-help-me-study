/* global chrome */

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
});

// Listen for messages from the web page
window.addEventListener('message', (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) return;

  if (event.data.type && event.data.type === 'FROM_PAGE') {
    // Get the value from storage
    chrome.storage.sync.get(event.data.key, (result) => {
      // Send a message back to the web page
      window.postMessage({
        type: 'FROM_EXTENSION',
        data: result[event.data.key]
      }, '*');
    });
  }
});

let bad = false;

sendData.then((data) => {
  chrome.storage.sync.get('whitelist', (obj) => {
    const whitelist = obj['whitelist'].substring(1, obj['whitelist'].length-1);
    console.log("whitelist", whitelist);
    console.log("source", data.source);
    console.log(data.source.includes(whitelist));
    if (whitelist !== undefined && data.source.includes(whitelist)) {  // Use includes instead of contains
      console.log("whitelist");
    }
  });
  
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
  .then((json) => {
    console.log(json);
    if (json.response.trim() === "brainrot" || json.response.trim() === "Brainrot") {
      bad = true;
    }
    if (bad !== undefined && bad === true) {
      window.location.replace("http://localhost:3000/problem");
    }
  });
});