
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import LoginRegistar from './Pages/LoginRegistar'
import { HashRouter as Router , Routes, Route,  } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Products from './Pages/Products';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
function App() {
  const [isLoggedIn , setLoggedIn] = useState(false)
  const [username, setUserName] = useState("")
  const [balance, setBalance] = useState()
  
  
  useEffect(()=>{
      if (localStorage.getItem("token")){
          setLoggedIn(true)
          setBalance(localStorage.getItem("balance"))
          setUserName(localStorage.getItem("username"))
      }
  
      
  },[isLoggedIn])

  return (
    
    <>


  <Router  >
  <Navbar key={isLoggedIn} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={username} balance={balance}/>
    <Routes>
      <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>}/>
      <Route path='/login' element={<LoginRegistar  isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}/>
      <Route path='/dashboard' element={<Products isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
      
    </Routes>
  
  </Router>
   <ToastContainer position='bottom-left' theme='dark'  hideProgressBar={true} autoClose={4000} />
   </>
  )
}

export default App
