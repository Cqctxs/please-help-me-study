import React from 'react';
import './App.css';
 
function App() {
 return (
   <div className="App">
     <h1>Blocker</h1>
 
     <div className="SEOForm">
       <h2>Add this site</h2>
        <form>
          <label>
            Site URL:
            <input type="url" name="url" value={window.location.href} required />
          </label>
          <button type="submit">Add</button>
        </form>
     </div>
   </div>
 );
}
 
export default App;
