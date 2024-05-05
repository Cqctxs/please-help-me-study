/* global chrome */
import React, { useState } from 'react';
import './App.css';
import useChromeStorage from './hooks/useChromeStorage';
import useChromeStoreList from './hooks/useChromeStoreList';

function App(link) {
  const [val, setVal] = useChromeStorage("topic", "Mathematics");
  const [url_w, set_url_w] = useState("");
  const [url_b, set_url_b] = useState("");

  const [w, whitelist] = useChromeStoreList("whitelist", []);
  const [b, blacklist] = useChromeStoreList("blacklist", []);

  return (
    <div className="App">
      <h1>Blocker</h1>
    <form>
      <label>
        <span>Today, I want to study </span>
        <input
          type="text"
          name="subject"
          onChange={(e) => {
            setVal(e.target.value);
          }}
          value={val}
          required
        />
      </label>
    </form>
    <form
    onSubmit={(e) => {
      whitelist(url_w, "add");
      set_url_w("");
      console.log("w");
    }}>
      <label>
        <span> Add </span>
        <input
          type="text"
          name="url"
          placeholder="https://www.example.com/"
          value = {url_w}
          onChange={(e) => {
            set_url_w(e.target.value);
          }}
          required
        />
      </label>
      <input type="submit" value="Submit"></input>
    </form>
    <div>{w}</div>
  </div>
  );
}
 
export default App;