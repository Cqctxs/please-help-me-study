import React from 'react';
import './App.css';
import useChromeStorage from './hooks/useChromeStorage';

function App(link) {
  const [val, setVal] = useChromeStorage("topic", "Mathematics");
  return (
    <div className="App">
      <h1>Blocker</h1>
    <form>
      <label>
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
  </div>
  );
}
 
export default App;