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
  const [isWhitelistOpen, setIsWhitelistOpen] = useState(false);
  const [isBlacklistOpen, setIsBlacklistOpen] = useState(false);

  const toggleWhitelistDropdown = () => {
    setIsWhitelistOpen(!isWhitelistOpen);
  };

  const toggleBlacklistDropdown = () => {
    setIsBlacklistOpen(!isBlacklistOpen);
  };

  return (
    <div className="App">
      <div className="field">
        <form>
          <label className="fields">
            <div>Today, I want to study</div>
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
          <label className="fields">
            <div>Whitelist</div>
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
          </label>
          <input
            type="submit"
            value="Add"
            onClick={(e) => {
              whitelist(url_w, "add");
              e.preventDefault();
            }}
          ></input>
          <input
            type="submit"
            value="Delete"
            onClick={(e) => {
              whitelist(url_w, "delete");
              set_url_w("");
              e.preventDefault();
            }}
          ></input>
          <button onClick={toggleWhitelistDropdown}>
            {isWhitelistOpen ? "Close" : "Open"} Whitelist Dropdown
          </button>
          {isWhitelistOpen && (
            <div>
              {w.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
        </form>
        <form>
          <label className="fields">
            <div>Blacklist</div>
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
          </label>
          <input
            type="submit"
            value="Add"
            onClick={(e) => {
              blacklist(url_b, "add");
              e.preventDefault();
            }}
          ></input>
          <input
            type="submit"
            value="Delete"
            onClick={(e) => {
              blacklist(url_b, "delete");
              set_url_b("");
              e.preventDefault();
            }}
          ></input>
          <button onClick={toggleBlacklistDropdown}>
            {isBlacklistOpen ? "Close" : "Open"} Blacklist Dropdown
          </button>
          {isBlacklistOpen && (
            <div>
              {b.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
        </form>
        <div>{w}</div>
        <div>{b}</div>
      </div>
    </div>
  );
}

export default App;