import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const Wrapper = styled.div`
  width: 100vw;
  max-height: auto;
  display: flex;
  overflow: scroll;
  justify-content: space-around;
`;
const Modal = styled.div`
  position: absolute;
  background-color: rgb(132, 132, 132);
  width: 30%;
  height: 240px;
  z-index: 9999;
  border: none;
  top: 25%;
  border-radius: 10px;

  box-shadow: 0px 0px 2px 2px rgb(58, 59, 59);
  display: ${(props) => props.display};
  background-color: rgb(43, 43, 43);

  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translate(-50%, 50%);
  @media screen and (max-width: 1000px) {
    width: 80%;
    height: 35%;
  }
`;

const Main = styled.div`
  background-color: rgb(43, 43, 43);
  width: 100%;
  min-height: 70%;
  max-height: auto;
  box-shadow: 0px 0px 2px 2px rgb(58, 59, 59);
  border: none;
  border-radius: 10px;
  align-items: center;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease-in-out;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 1000px) {

    margin-top: 20px;
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
 
`;
const Heading = styled.h3`
  padding: 0;

  @media screen and (max-width: 1000px) {
    font-size: 10px;
    
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
`;

const Phone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media screen and (max-width: 1000px) {
    font-size: 10px;
    
  }
`;

const ActivationHistory = ({ setBuying, isBuying }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setBuying(true);

    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const config = {
        "Content-Type": "application/json",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .post("https://tatkalsms.azurewebsites.net/orders", {}, config)
        .then((response) => {
          setOrders(response.data.data);
          setBuying(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <Modal display={isBuying ? "flex" : "none"}>
        {" "}
        <ClimbingBoxLoader
          color="#d9ac6a"
          size={26}
          cssOverride={{
            transform: "rotate(45deg)",
          }}
        />
      </Modal>
      <Top>
        <Heading>Order Id</Heading>
        <Heading>Phone </Heading>
        <Heading>Service</Heading>
        <Heading>Status</Heading>
        <Heading>Otps</Heading>
      </Top>
      <Wrapper className={isBuying ? "blur" : ""}>
        <Main>
          <Bottom>
            {orders.slice().reverse().map((order) => (
              <Content key={order.id}>
                <Phone>{order.id}</Phone>
                <Phone>{order.phone}</Phone>
                <Phone>{order.product}</Phone>
                <Phone>{order.status}</Phone>
                <Phone>{order.sms.length}</Phone>
              </Content>
            ))}
          </Bottom>
        </Main>
      </Wrapper>
    </>
  );
};

export default ActivationHistory;
