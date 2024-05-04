import React from 'react';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';

function App(link) {
  const [val, setVal] = useLocalStorage("");
  return (
    <div className="App">
      <h1>Blocker</h1>
    <form onSubmit={(e) => {
      e.preventDefault();
      fetch('http://localhost:8080/api/problem/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic: val })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          // Handle the error
        });
    }}>
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
      <button type="submit">Submit</button>
    </form>
  </div>
  );
}
 
export default App;