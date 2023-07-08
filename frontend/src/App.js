
import './App.css';
import {  BrowserRouter,Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Homepage from './components/Homepage';
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <div className="App">
    
    <BrowserRouter >
      <Navbar />
     <Routes>
      <Route element = {<PrivateComponent />} >
     <Route path="/" element={<Homepage />} />
  </Route>
       <Route path="/signup" element={<SignUp />} />
       <Route path="/login" element={<Login />} />

     </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
