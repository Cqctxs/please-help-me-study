import React, { useState } from 'react';
import './App.css';
import useChromeStorage from './hooks/useChromeStorage';
import useChromeStoreList from './hooks/useChromeStoreList';

function App() {
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
    <form>
      <label>
        <span>Whitelist</span>
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
      <input type="submit" value="Add" onClick={(e) => {
      whitelist(url_w, "add");
      e.preventDefault();
    }}></input>
      <input type="submit" value="Delete" onClick={(e) => {
      whitelist(url_w, "delete");
      e.preventDefault();
    }}></input>
    </form>
    <form>
      <label>
        <span>Blacklist</span>
        <input
          type="text"
          name="url"
          placeholder="https://www.example.com/"
          value = {url_b}
          onChange={(e) => {
            set_url_b(e.target.value);
          }}
          required
        />
      </label>
      <input type="submit" value="Add" onClick={(e) => {
      blacklist(url_b, "add");
      e.preventDefault();
    }}></input>
      <input type="submit" value="Delete" onClick={(e) => {
      blacklist(url_b, "delete");
      e.preventDefault();
    }}></input>
    </form>
    <div>{val}</div>
    <div>{w}</div>
    <div>{b}</div>
  </div>
  );
}
 
export default App;