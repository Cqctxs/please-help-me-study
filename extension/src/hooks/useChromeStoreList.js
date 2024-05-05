/* global chrome */

import { useState, useEffect } from 'react';

function useChromeStoreList(key, initialValue) {
    
    const [urlList, setUrlList] = useState(initialValue);

    useEffect(() => {
        chrome.storage.sync.get([key], function(result) {
            setUrlList(result[key] ? JSON.parse(result[key]) : initialValue);
        });
    }, [key, initialValue]);
    
    const update = (value, mode) => {
        if (value !== "" && value !== null && value !== undefined) {
            chrome.storage.sync.get([key], (obj) => {
                let array = obj[[key]];
                if (array && Array.isArray(array)) {
                    if (mode === "delete" && array.indexOf(value) !== -1) array.splice(array.indexOf(value), 1);
                    else if (mode === "add" && array.indexOf(value) === -1) array.push(value);
                    setUrlList(array);
                    chrome.storage.sync.set({
                        [key]:array
                    }, function() {
                        console.log("updated");
                    });
                }
                else {
                    console.log("Error: not an array");
                }
            });
        }
    }    

    return [urlList, update];
}

export default useChromeStoreList;