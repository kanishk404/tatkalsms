import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../assets/smartphone.png";
import { Link } from "react-router-dom";
import Menu from "./Example"
const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Right = styled.div`
display: "flex";
@media screen and (max-width: 800px) {
    width: 90%;
    display: ${(props) => props.display};
    padding: 20px;
    margin-right: 10px;
}`;

const Logo = styled.h2`
  padding: 0;
  margin: 0 0 0 10px;

  color: #eab566;
  font-size: 16px;
`;

const GetStarted = styled.button`
  width: auto;
  height: auto;
  cursor: pointer;
  border: none;
  border-radius: 10px 0;
  font-size: 14px;
  padding: 9px;
  background-color: #433218;
  &:hover {
    transform: scale(1.1);
  }
`;

const DetailsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Profile = styled.div``;
const Username = styled.h4``;
const Balance = styled.div``;


const LogoImage = styled.img`
  width: 35px;
  margin-left: 0.4rem;
`;

const Navbar = ({ isLoggedIn, setLoggedIn, username, balance, isBuying ,purchase}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("balance");
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <>
     <Menu balance={balance} setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} purchase={purchase}/>
      <Wrapper className={isBuying ? "blur" : ""}>
     
        <Left onClick={() => navigate("/")}>
          <Logo>Tatkal</Logo>
          <LogoImage src={LogoImg} />
        </Left>
        <Right display="none">
          {isLoggedIn ? (
            <DetailsDiv>
            <Link className="order-link"to="/activation-history">Orders</Link>
              <Username>{username}</Username>
              <Balance>Rs.{balance}  </Balance>
              <Profile></Profile>
              
              <GetStarted onClick={handleLogout}>Log-Out</GetStarted>
            </DetailsDiv>
          ) : (
            <GetStarted
              onClick={() => {
                navigate("/login");
              }}
            >
              Log-in / Sign-Up
            </GetStarted>
          )}
        </Right>
      </Wrapper>
    </>
  );
};

export default Navbar;
