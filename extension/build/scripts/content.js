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
let whitelisted = false;
let blacklisted = false;

sendData.then((data) => {
  chrome.storage.sync.get('blacklist', (obj) => {
    const blacklist = obj['blacklist'];
    blacklist.forEach(b => {
      const url = b.substring(1, b.length-1);
      if (url !== undefined && data.source.includes(url)) {
        console.log("blacklist");
        blacklisted = true;
      }
    });
  });

  chrome.storage.sync.get('whitelist', (obj) => {
    const whitelist = obj['whitelist'];
    whitelist.forEach(w => {
      const url = w.substring(1, w.length-1);
      if (url !== undefined && data.source.includes(url)) {
        console.log("whitelist");
        whitelisted = true;
      }
    });
  });
  
  if (!whitelisted) {
    whitelisted = false;
    console.log("sent", JSON.stringify({ prompt: data.prompt, source: data.source}));
    fetch("https://api.pleasehelpme.study/api/grade", {
      mode: 'no-cors',
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
      if (blacklisted || (bad !== undefined && bad === true)) {
        window.location.replace("https://pleasehelpme.study/problem");
      }
    });
  }
});