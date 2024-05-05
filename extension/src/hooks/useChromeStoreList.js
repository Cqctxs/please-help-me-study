/* global chrome */

import { useState } from 'react';

function useChromeStoreList(key, initialValue) {
    
    const [urlList, setUrlList] = useState(initialValue);

    chrome.storage.sync.set({
        [key]:[]
    }, function() {
        console.log("added to list");
    });

    const update = (value, mode) => {
        chrome.storage.sync.get([key], (obj) => {
            const array = obj[[key]];
            if (mode === "remove") array.remove(array.indexOf(value));
            else if (mode === "add") array.push(value);
            setUrlList(array);
            chrome.storage.sync.set({
                [key]:array
            }, function() {
                console.log("updated");
            });
        });
    }
    console.log(urlList);
    return [urlList, update];
}

export default useChromeStoreList;