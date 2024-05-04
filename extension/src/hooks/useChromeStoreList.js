/* global chrome */

import { useState, useEffect } from 'react';

function useChromeStoreList(key, initialValue) {
    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(() => {
        chrome.storage.sync.get([key], function(result) {
            setStoredValue(result[key] ? JSON.parse(result[key]) : initialValue);
        });
    }, [key, initialValue]);

    const appendValue = (value) => {
        try {
            const updatedValue = [...storedValue, value];
            setStoredValue(updatedValue);
            chrome.storage.sync.set({ [key]: JSON.stringify(updatedValue) });
            console.log("updatedValue", updatedValue);
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, appendValue];
}

export default useChromeStoreList;