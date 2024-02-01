import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import StudentRegisterForm from './Components/StudentRegisterForm';
import { Toaster } from 'react-hot-toast';
import Context from './Context/context';
import StudentDetails from './Pages/StudentDetails';
import Navbar from './Components/Navbar';
import SelectedStudentForm from './Pages/SelectedStudentDetails';
// import axios from 'axios';

// axios.defaults.baseURL = 'https://elite-nwwo.onrender.com';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Context>
          <Toaster position='top-center' reverseOrder={false} />
          <Routes>
            <Route path='/' element={<StudentRegisterForm />} />
            <Route path='/studentDetails' element={<StudentDetails />} />
            <Route path='/selectedStudent' element={<SelectedStudentForm />} />
          </Routes>
        </Context>
      </BrowserRouter>
    </>
  );
}

export default App;
