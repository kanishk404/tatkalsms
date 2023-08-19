import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"


const Wrapper = styled.div`
margin-top: 1rem;
display: flex;
justify-content: space-around;

`
const Left = styled.div`

`
const Right = styled.div`

`

const Logo = styled.h2`
padding: 0;
margin: 0;
color:#EAB566;
`

const GetStarted = styled.button`
width: auto;
height: auto;
cursor: pointer;
border: none;
border-radius: 10px;
font-size: 16px;
padding: 10px;
background-color: #433218;
&:hover{
    transform: scale(1.1);
    
}

`

const DetailsDiv = styled.div`
display: flex;
align-items: center;
gap: 10px;
`
const Profile = styled.div`

`
const  Username = styled.h3`

`
const Balance = styled.div`

`



const Navbar = ({isLoggedIn , setLoggedIn}) => {
    const navigate = useNavigate()
    const [username, setUserName] = useState("")
    const [balance, setBalance] = useState()
    
    
    useEffect(()=>{
        if (localStorage.getItem("token")){
            setLoggedIn(true)
            setBalance(localStorage.getItem("balance"))
            setUserName(localStorage.getItem("username"))
        }
    
        
    },[])


    const handleLogout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem("username")
        localStorage.removeItem("balance")
        setLoggedIn(false)
        navigate('/')
    }
  return (
    <>
    <Wrapper  >
        <Left>
        <Logo>Tatkal SMS</Logo>
        </Left>
        <Right>
            { isLoggedIn ? (
                <DetailsDiv>
                    <Username>{username}</Username>
                    <Balance>{balance}</Balance>
                    <Profile></Profile>
                    <GetStarted onClick={handleLogout} >Log-Out</GetStarted>
                </DetailsDiv>
                
            ) :(
                <GetStarted onClick={()=>{navigate("/login")}}>Log-in / Sign-Up</GetStarted>
                
            ) }
        </Right>

    </Wrapper>

    </>
  )
}

export default Navbar