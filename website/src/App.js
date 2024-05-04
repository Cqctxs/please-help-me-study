import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ProblemDisplay from './components/ProblemDisplay';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/problem" element={<ProblemDisplay />} />
    </Routes>
  );
}

export default App;