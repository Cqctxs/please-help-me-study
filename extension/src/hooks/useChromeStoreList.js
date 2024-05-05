/* global chrome */

import { useState, useEffect } from 'react';

function useChromeStoreList(key, value, mode, listName) {
    
    const [urlList, setUrlList] = useState([]);

    const init = () => {
        chrome.storage.sync.set({
            [key]:[]
        }, function() {
            console.log("added to list");
        });
    }

    chrome.storage.sync.get('whitelist', (obj) => {
        const array = obj['whitelist'];
        if (mode === "remove") array.remove(array.indexOf(value));
        else if (mode === "add") array.push(value);
        setUrlList(array);
        chrome.storage.sync.set({
            [key]:array
        }, function() {
            console.log("update from list with new values");
        });
    });
    
    return [urlList];
}

export default useChromeStoreList;