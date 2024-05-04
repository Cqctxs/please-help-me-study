/* global chrome */

import { useState, useEffect } from 'react';

function useChromeStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    chrome.storage.sync.get([key], function(result) {
      setStoredValue(result[key] ? JSON.parse(result[key]) : initialValue);
    });
  }, [key, initialValue]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      chrome.storage.sync.set({ [key]: JSON.stringify(valueToStore) });
      console.log("valueToStore", valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useChromeStorage;