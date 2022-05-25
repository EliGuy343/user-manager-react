import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Users } from './pages/users/Users';
function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
