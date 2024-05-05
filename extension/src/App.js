import React, { useState, useEffect } from 'react';
import './App.css';
import useChromeStorage from './hooks/useChromeStorage';
import useChromeStoreList from './hooks/useChromeStoreList';

function App() {
  const [val, setVal] = useChromeStorage("topic", "Mathematics");
  const [url_w, set_url_w] = useState("");
  const [url_b, set_url_b] = useState("");
  const [w, whitelist] = useChromeStoreList("whitelist", []);
  const [b, blacklist] = useChromeStoreList("blacklist", []);

  useEffect(() => {
    whitelist("a", "add");
    whitelist("a", "delete");
    blacklist("a", "add");
    blacklist("a", "delete");
  }, []
  );

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
        <div className="form__group field">
          <input
            type="input"
            className="form__field_whitelist"
            name="whitelist"
            id="whitelist"
            placeholder="https://www.example.com/"
            value={url_w}
            onChange={(e) => {
              set_url_w(e.target.value);
            }}
            required
          />
          <label for="whitelist" className="form__label">Whitelist</label>
        </div>
        <div className="list">{w.join(', ')}</div>
        <div className="buttons">
          <input className="submitButton"
            type="submit"
            value="Add"
            onClick={(e) => {
              whitelist(url_w, "add");
              e.preventDefault();
            }}>   
          </input>
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
        <div className="form__group field">
          <input
            type="input"
            className="form__field_blacklist"
            name="blacklist"
            id="blacklist"
            placeholder="https://www.example.com/"
            value={url_b}
            onChange={(e) => {
              set_url_b(e.target.value);
            }}
            required
          />
          <label for="blacklist" className="form__label">Blacklist</label>
        </div>
        <div className="list">{b.join(', ')}</div>
        <div className="buttons">
          <input className="submitButton"
            type="submit"
            value="Add"
            onClick={(e) => {
              blacklist(url_b, "add");
              e.preventDefault();
            }}>
          </input>
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
      </div>
    </div>
  );
}

export default App;