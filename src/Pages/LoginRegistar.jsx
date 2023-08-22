import { useState , useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(43, 43, 43);
  gap: 12px;
  width: 40%;
  height: auto;
  min-height: 70%;
  box-shadow: 0px 0px 2px 2px rgb(58, 59, 59);
  border: none;
  border-radius: 10px;
  align-items: center;
  padding-top: 8rem;
  text-align: center;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 1000px) {
    width: 90% !important;
    padding: 20px;
    margin-right: 10px;
    min-height:60%;
  }
  @media screen and (max-width: 1500px) {
    padding: 20px;
    width:38%;
  }
`;

const Input = styled.input`
  width: 50%;
  height: 50px;
  padding: 20px;
  outline: none;
  border: none;
  font-size: 19px;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgb(58, 59, 59);

  &:focus {
    background-color: #363e4c;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  @media screen and (max-width: 1400px) {
    padding: 20px;
    font-size: 16px;
    height: 16px;
  
  }
`;

const Button = styled.button`

  width: 50%;
  height: 40px;
  margin-top: 16px;
  font-size: 18px;
  padding: 10px;
  box-shadow: 0px 0px 2px 2px rgb(58, 59, 59);
  border-radius: 10px 0;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background-color: #433218 ;
  }
  @media screen and (max-width: 1400px) {
    
    font-size: 16px;
    height: 32px;
  
  }
`;

const BottomNote = styled.small`
  margin-top: 30px;
`;

const Heading = styled.h1`
color: #D9AC6A;
@media screen and (max-width: 1400px) {
    
    font-size: 24px;
  
  
  }

`;
const Span = styled.span`
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  color: #D9AC6A;
  &:hover {
    color: lightsteelblue;
  }

`;

const LoginRegistar = ({isLoggedIn , setLoggedIn}) => {
  const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate();
  
  const [isLogin, setLogin] = useState(true);
  const [LogInData, setLoginData] = useState({ email: "", password: "" });
  const [RegisterData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(()=>{
    if (localStorage.getItem("token")){
    setLogin(true)
    navigate("/dashboard");
  }
  })


  const HandleChange = (event) => {
    if (isLogin) {
      setLoginData({
        ...LogInData,
        [event.target.name]: event.target.value,
        
      });
    
    } else {
      setRegisterData({
        ...RegisterData,
        [event.target.name]: event.target.value,
      });
    
    }
  };

  const HandleLogin = () => {
    const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;
 
    
    axios
      .post("https://tatkalsms.azurewebsites.net/login", LogInData)
      .then((response) => {
        
        toast.success(response.data.message+"🪄")
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", response.data.user.name)
        localStorage.setItem("balance", response.data.user.balance)
        console.log(response.data.user)
        setTimeout(()=>{
          setLoggedIn(true)
          navigate("/dashboard")
        }, 2000)

      })
      .catch((error) => {
        if(error.response.status=== 503){
            toast.error(error.response.data.message+"🤔")
            
        }
        else if (error.response.status===402){
            toast.error(error.response.data.message+"🫤")
        }
        else if(error.response.status===401){
            toast.error(error.response.data.message+"🤯")
        }
        else{
            toast.error(error.response.data.message+"🥲")
        }
      });
      
  };

  const HandleRegister = ()=>{
    axios.post("https://tatkalsms.azurewebsites.net/register", RegisterData).then((response)=>{
        toast.success(response.data.message+"🪄")
        setTimeout(()=>{
            setLogin(true)
        },5000)
        
    })
    .catch((error)=>{
        toast(error.response.data.message + "😒", {position:"top-center"})
    })
  }

  return (
    <>
      <Wrapper>
        <Main>
          {isLogin ? (
            <>
              <Heading>Login</Heading>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={HandleChange}
                value={LogInData.email}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={HandleChange}
                value={LogInData.password}
              />
              <Button onClick={HandleLogin}>Login</Button>
              <Span onClick={() => setLogin(false)}>
                New? Create Account Now
              </Span>
            </>
          ) : (
            <>
              <Heading>Register</Heading>
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={HandleChange}
                value={RegisterData.name}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={HandleChange}
                value={RegisterData.email}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={HandleChange}
                value={RegisterData.password}
              />
              <Button onClick={HandleRegister}>Register</Button>
              <Span onClick={() => setLogin(true)}>
                {" "}
                Have A Account Login Now!
              </Span>
              <BottomNote>
                You can Use any Unique Email to Login we Dont Verify Email!
              </BottomNote>
            </>
          )}
        </Main>
      </Wrapper>
    </>
  );
};

export default LoginRegistar;
