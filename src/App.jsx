
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import LoginRegistar from './Pages/LoginRegistar'
import { HashRouter as Router , Routes, Route,  } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Products from './Pages/Products';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import ActivationHistory from './Pages/ActivationHistory';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndConditions from './Pages/TermsAndCondition';
import Refund from './Pages/Refund';





function App() {
  const [isLoggedIn , setLoggedIn] = useState(false)
  const [username, setUserName] = useState("")
  const [balance, setBalance] = useState()
  const [purchase , setPurchase] = useState(false)
  const [isBuying, setBuying] = useState(false);
  const [number, setNumber] = useState(123456789);
  const [orderId, setOrderId] = useState();
  const [sms, setSms] = useState([]);
  const [waitingForSms, setWaiting] = useState(false)
  
  useEffect(()=>{
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        localStorage.removeItem("token")
        setLoggedIn(false)
      } else {
  
        setLoggedIn(true);
        setBalance(localStorage.getItem('balance'));
        setUserName(localStorage.getItem('username'));
       
      }
      if(localStorage.getItem("number")){
        setNumber(localStorage.getItem("number"))
        setOrderId(localStorage.getItem("orderid"))
        setPurchase(true)
      }
    }
  
      
  },[isLoggedIn, purchase])

  return (
    
    <>


  <Router  >
  <Navbar key={isLoggedIn} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} purchase={purchase}   username={username} balance={balance} isBuying={isBuying} setBuying={setBuying}/>
    <Routes>
      <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>}/>
      <Route path='/login' element={<LoginRegistar  isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}/>
      <Route path='/dashboard' element={<Products setWaiting waitingForSms sms={sms} setSms={setSms} number={number} setNumber={setNumber}  orderId={orderId} setOrderId={setOrderId} isBuying={isBuying} setBuying={setBuying} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} purchase={purchase} setPurchase={setPurchase}/>} />
      <Route path='/activation-history' element={<ActivationHistory  isBuying={isBuying} setBuying={setBuying} />}/>
      <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
      <Route path='/terms-conditions' element={<TermsAndConditions/>} />
      <Route path='/refund' element={<Refund/>} />
    </Routes>
  
  </Router>
   <ToastContainer position='bottom-left' theme='dark'  hideProgressBar={true} autoClose={4000} />
   </>
  )
}

export default App
