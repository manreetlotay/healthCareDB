import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage';
import QueryPage from './components/QueryPage';
import PersonTable from './components/PersonTable';
import AddressTable from './components/AddressTable';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFacilityTable from './components/EmployeeFacility';
import FacilityTable from './components/Facility';
import InfectionTable from './components/InfectionTable';
import LogTable from './components/LogTable';
import PersonResidenceTable from './components/PersonResidenceTable';
import RelationTable from './components/RelationTable';
import ResidenceTable from './components/ResidenceTable';
import ScheduleTable from './components/ScheduleTable';
import VaccinationTable from './components/VaccinationTable';

function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      {/* <Route path='/query' element={<QueryPage />} /> */}
      <Route path='/person' element={<PersonTable />} />
      <Route path='/address' element={<AddressTable />} />
      <Route path='/employee' element={<EmployeeTable />} />
      <Route path='/employeeFacility' element={<EmployeeFacilityTable />} />
      <Route path='/facility' element={<FacilityTable />} />
      <Route path='/infection' element={<InfectionTable />} />
      <Route path='/log' element={<LogTable />} />
      <Route path='/personResidence' element={<PersonResidenceTable />} />
      <Route path='/relation' element={<RelationTable />} />
      <Route path='/residence' element={<ResidenceTable />} />
      <Route path='/schedule' element={<ScheduleTable />} />
      <Route path='/vaccination' element={<VaccinationTable />} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
