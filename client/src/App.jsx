
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import LoginRegistar from './Pages/LoginRegistar'
import { BrowserRouter as Router , Routes, Route, BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Products from './Pages/Products';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
function App() {
  const [isLoggedIn , setLoggedIn] = useState(false)

  return (
    
    <>


  <Router>
  <Navbar key={isLoggedIn} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginRegistar  isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}/>
      <Route path='/dashboard' element={<Products isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
      
    </Routes>
  
  </Router>
   <ToastContainer position='bottom-left' theme='dark'  hideProgressBar={true} autoClose={4000} />
   </>
  )
}

export default App
