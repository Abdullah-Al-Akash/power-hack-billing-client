import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './Pages/Login/Registration';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Registration></Registration>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
