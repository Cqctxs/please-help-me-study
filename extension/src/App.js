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
      <div className="field">
        <form>
          <h3>Today, I want to study</h3>
          <input
            type="text"
            name="subject"
            onChange={(e) => {
              setVal(e.target.value);
            }}
            value={val}
            required
          />
        </form>
        <form>
          <h3>Whitelist</h3>
          <input
            type="text"
            name="url"
            placeholder="https://www.example.com/"
            value={url_w}
            onChange={(e) => {
              set_url_w(e.target.value);
            }}
            required
          />
        </form>
        <div className="buttons">
          <input className="submitButton"
            type="submit"
            value="Add"
            onClick={(e) => {
              whitelist(url_w, "add");
              e.preventDefault();
            }}
          ></input>
          <input className="deleteButton"
            type="submit"
            value="Delete"
            onClick={(e) => {
              whitelist(url_w, "delete");
              set_url_w("");
              e.preventDefault();
          }}>
          </input>
        </div>
        <div className="list">{w.join(', ')}</div>
        <form>
          <h3>Blacklist</h3>
          <input
            type="text"
            name="url"
            placeholder="https://www.example.com/"
            value={url_b}
            onChange={(e) => {
              set_url_b(e.target.value);
            }}
            required
          />
        </form>
        <div className="buttons">
          <input className="submitButton"
            type="submit"
            value="Add"
            onClick={(e) => {
              blacklist(url_b, "add");
              e.preventDefault();
            }}
          ></input>
          <input className="deleteButton"
            type="submit"
            value="Delete"
            onClick={(e) => {
              blacklist(url_b, "delete");
              set_url_b("");
              e.preventDefault();
            }}>
            </input>
            </div>
        <div className="list">{b.join(', ')}</div>
      </div>
    </div>
  );
}

export default App;