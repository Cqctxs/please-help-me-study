import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProblemDisplay from './components/ProblemDisplay';
import Homepage from './components/Homepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/problem" element={<ProblemDisplay />} />
    </Routes>
  );
}

export default App;