import React, { useState } from 'react';
import './App.css';

function App(link) {
  const [val, setVal] = useState("");
  return (
    <div className="App">
      <h1>Blocker</h1>
  
      <div className="SEOForm">
        <h2>What topic do you want to study?</h2>
          <form>
            <label>
            <input type="text"
            name="subject"
            onChange = {(e) => {
              setVal(e.target.value);
              e.preventDefault();
            }}
            value={val}
            required />
            </label>
            {/* <label>
              Site URL:
              <input type="url" name="url" value="temp url"{window.location.href} required />
            </label>
            <button type="submit">Add</button> */}
          </form>
      </div>
    </div>
  );
}
 
export default App;