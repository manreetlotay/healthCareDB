import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage';

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

import Query8 from './components/queries/Query8';
import Query9 from './components/queries/Query9';
import Query10 from './components/queries/Query10';
import Query11 from './components/queries/Query11';
import Query12 from './components/queries/Query12';
import Query13 from './components/queries/Query13';
import Query14 from './components/queries/Query14';
import Query15 from './components/queries/Query15';
import Query16 from './components/queries/Query16';
import Query17 from './components/queries/Query17';
import Query18 from './components/queries/Query18';


function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      
      {/* Tables */}
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

      {/* Queries */}
      <Route path='/query/8' element={<Query8 />} />
      <Route path='/query/9' element={<Query9 />} />
      <Route path='/query/10' element={<Query10 />} />
      <Route path='/query/11' element={<Query11 />} />
      <Route path='/query/12' element={<Query12 />} />
      <Route path='/query/13' element={<Query13 />} />
      <Route path='/query/14' element={<Query14 />} />
      <Route path='/query/15' element={<Query15 />} />
      <Route path='/query/16' element={<Query16 />} />
      <Route path='/query/17' element={<Query17 />} />
      <Route path='/query/18' element={<Query18 />} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
