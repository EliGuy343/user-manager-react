import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Users } from './pages/users/Users';


function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users/>}/>
      </Routes>
      <ToastContainer/>
      </BrowserRouter>
  );
}

export default App;
