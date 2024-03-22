import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage';
import PersonTable from './components/PersonTable';


function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/person' element={<PersonTable />} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
