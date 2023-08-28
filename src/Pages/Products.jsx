import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { data as jsonData } from "../assets/Data.js";
import {
  CountrSelectStyle,
  ServiceSelectStyles,
} from "../styles/SelectStyles.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClimbingBoxLoader,ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Main = styled.div`
  background-color: rgb(43, 43, 43);
  width: ${(props) => props.width};
  min-height: 70%;
  max-height: auto;
  max-width: 920px;
  box-shadow: 0px 0px 2px 2px rgb(58, 59, 59);
  border: none;
  border-radius: 10px;
  align-items: center;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease-in-out;
  display: ${(props) => props.waiting};
  @media screen and (max-width: 800px) {
    width: 90%;
    display: ${(props) => props.display};
    padding: 20px;
    margin-right: 10px;
  }
`;
const ProviderDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const BuyButton = styled.div`
  position: relative;
  text-align: center;
  padding: 4px;
  width: 90%;
  height: 40px;
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 0px 2px 2px rgb(58, 59, 59);
  border-radius: 10px 0;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  &::after {
    cursor: pointer;
    content: "Buy";
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    width: 90px;
    height: 100%;
    border-radius: 10px 0;
    background-color: rgb(71, 55, 28);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover::after {
    opacity: 1;
    background-color: #433218;
  }
  @media screen and (max-width: 1500px) {
    font-size: 14px;
    width: 70%;
    left: 7%;
    height: auto;
  }
  @media screen and (max-width: 1000px) {
    font-size: 12.5px;
    width: 80%;
    left: 7%;
    height: auto;
  }
`;
const NumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 60%;
  height: 52px;
  border: none;
  border-radius: 10px;
  background-color: #242424;
  @media screen and (max-width: 1500px) {
    height: 42px;
  }
  &::after {
    cursor: pointer;
    content: "Copy";
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    width: 90px;
    height: 100%;
    border-radius: 0 10px 10px 0;
    background-color: rgb(71, 55, 28);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover::after {
    opacity: 1;
  }
`;

const OtpDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 60%;
  height: 42px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  background-color: #242424;
  &::after {
    cursor: pointer;
    content: "Copy";
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    width: 90px;
    height: 100%;
    border-radius: 0 10px 10px 0;
    background-color: rgb(71, 55, 28);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover::after {
    opacity: 1;
  }
`;

const CustomButton = styled.button`
  text-align: center;
  padding: 4px;
  width: 75px;
  min-width: auto;
  height: 40px;
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 0px 2px 2px rgb(58, 59, 59);
  border-radius: 10px 0;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background-color: #433218;
  }
  @media screen and (max-width: 1500px) {
    margin-top: 0;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 60%;
  margin-top: 4rem;
`;

const OtpWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const options = [
  { value: "india", label: "India" },
  { value: "usa", label: "USA" },
];

const Heading = styled.h2`
  color: #d9ac6a;

  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
  @media screen and (max-width: 1500px) {
    font-size: 17px;
  }
`;
const Span = styled.span`
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  color: #d9ac6a;
  &:hover {
    color: lightsteelblue;
  }
`;
function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

// modal

const Modal = styled.div`
  position: absolute;
  background-color: rgb(132, 132, 132);
  width: 30%;
  height: 240px;
  z-index: 9999;
  border: none;

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

// Styled Component Above

//  App Starts From Here

const Products = ({
  isLoggedIn,
  purchase,
  setPurchase,
  isBuying,
  setSms,
  sms,
  setOrderId,
  orderId,
  number,
  setNumber,
  waitingForSms,
  setWaiting,


  setBuying = { setBuying },
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [country, setCountry] = useState("india");
  const [service, setService] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [operator, setOperator] = useState("");
  const [price, setPrice] = useState(0);
  const [trigger, setTrigger] = useState(0);
  

  const config = {
    "Content-Type": "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const HandleBuy = () => {
    if (country && service && operator && !purchase) {
      setBuying(true);
      const data = {
        country: country,
        service: service,
        provider: operator,
        price: price,
      };
      axios
        .post("https://tatkalsms.azurewebsites.net/buy", data, config)
        .then((response) => {
          setPurchase(true);
          setOrderId(response.data.id)
          setNumber(response.data.phone);
          localStorage.setItem("number",response.data.phone)
          localStorage.setItem("orderid",response.data.id)
          setBuying(false);
          toast.success("Number Purchased Sucessfully")
        })
        .catch((error) => {
          setBuying(false);
          let code = error.response.status;
          if (code === 610) toast.error("Snap! Something Horrible Happend 🫤");
          else if (code === 600) toast.error("Numbers out of Stock");
          else if (code === 601) toast.error("Low on Balance");
        });
    }
    else{
      toast.error("Number Already Active")
    }
  };

  //  Handle Cancel
  const HandleCancel = () => {
    setBuying(true);
    if(!purchase){
      setBuying(false);
      toast.error("No Active Numbers")

    }
    else if ((sms.length === 0)) {
      setBuying(true);

     
      axios
        .post("https://tatkalsms.azurewebsites.net/cancel", {orderid:orderId}, config)
        .then((response) => {
          setBuying(false);
          toast.success("Number Cancelled Successfully");
          setNumber(12345678)
          setPurchase(false);
          localStorage.removeItem("orderid");
          localStorage.removeItem("number")
        })
        .catch((error) => {
          setBuying(false);
          toast.error("Number Cannot Be Canceled");
          console.log(error);
        });
    }
    else{
      setBuying(false);
      toast.error("Otp Recived You cannot Canncel")
    }
  };

  //  Handle Finish
  const HandleFinish = () => {
    setBuying(true);
    if(!purchase){
      setBuying(false);
      toast.error("No Active Numbers")

    }
    else{
    axios
      .post("https://tatkalsms.azurewebsites.net/finish", {orderid:orderId}, config)
      .then((response) => {
        setBuying(false);
        toast.success("Number Finished Successfully");
        console.log(response);
        setPurchase(false);
        localStorage.removeItem("orderid");
        localStorage.removeItem("number")
      })
      .catch((error) => {
        setBuying(false);
        toast.error("Number Cannot Be Finished");
        console.log(error);
      });
    }
  };
  //  Handle Ban

  const HandleBan = () => {
    setBuying(true);
    if(!purchase){
      setBuying(false);
      toast.error("No Active Numbers")

    }
    else{
    axios
      .post("https://tatkalsms.azurewebsites.net/ban", {orderid:orderId}, config)
      .then((response) => {
        setBuying(false);
        toast.success("Number Banned Successfully");
        console.log(response);
        setPurchase(false);
        localStorage.removeItem("orderid");
        localStorage.removeItem("number")
      })
      .catch((error) => {
        setBuying(false);
        toast.error("Number Cannot Be Banned");
        console.log(error);
      });
    }
  };

  // Handle Buynig Logic ALl Use Effects


  //  Buying UseEffect
  useEffect(() => {
    if (operator) HandleBuy();
  }, [operator, trigger]);

  // Checking Sms UseEffect

  

  useEffect(() => {
    let intervalId;

    if (purchase) {
      
      intervalId = setInterval(() => {
        axios.post("https://tatkalsms.azurewebsites.net/sms", {orderid:orderId} , config)
        .then((response)=>{
          setSms(response.data.sms)
        }).catch((error)=>{
          toast.error("Some Error happend")
        })
      }, 10000);
    } else {
      
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [purchase]);













  // Handle Country Change
  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry.value);
  };

  const countryData = jsonData[country];

  const serviceOptions = Object.keys(countryData).map((serviceKey) => ({
    value: serviceKey,
    label: serviceKey,
  }));
  const handleServiceChange = (selectedService) => {
    setService(selectedService.value);
    setServiceData(countryData[selectedService.value]);
  };

  return (
    <>
      {isLoggedIn && (
        <>
          {" "}
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
          <Wrapper className={isBuying ? "blur" : ""}>
            <Main width={"35%"} waiting={purchase ?"none": ""}>
              <Heading>Choose Country</Heading>
              <Select
                onChange={handleCountryChange}
                value={options.find((option) => option.value === country)}
                options={options}
                styles={CountrSelectStyle}
                placeholder="Select Country"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "#3A3A3A",
                    primary: "black",
                  },
                })}
              />
              <Heading>Choose Service and Provider</Heading>
              <Select
                onChange={handleServiceChange}
                value={options.find((option) => option.value === service)}
                options={serviceOptions}
                styles={ServiceSelectStyles}
                placeholder="Select Service"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "#3A3A3A",
                    primary: "black",
                  },
                })}
              />
              <ProviderDiv>
                {serviceData &&
                  Object.keys(serviceData).map((key) => (
                    <BuyButton
                      key={key}
                      onClick={() => {
                        setOperator(key);
                        setPrice(parseInt(serviceData[key].cost + 24));
                        setTrigger((trigger) => (trigger += 1));
                      }}
                    >
                      {" "}
                      Buy {key[0].toUpperCase() + key.slice(1, key.length)} -
                      Price: {parseInt(serviceData[key].cost + 24)} Rs
                    </BuyButton>
                  ))}
              </ProviderDiv>
            </Main>
            <Main width={"60%"} display={purchase?"":"none"}>
              <OtpWrapper>
                <Heading>Number:</Heading>

                <NumberBox>{number}</NumberBox>
                <Heading>SmS and Otps:</Heading>
                 {sms.length ===0 && purchase && (
                  <>
                    Waiting for sms....
                    <ClimbingBoxLoader cssOverride={{
                transform: "rotate(45deg)",
              }} color="#d9ac6a"/>
                    </>)}     
                {sms &&
                  sms.map((element) => (
                    <OtpDiv>
                      <span key={element.code}>Sender :  {element.sender}. Otp:  {element.code} </span>
                    </OtpDiv>
                  ))}

                <ButtonDiv>
                  <CustomButton onClick={HandleCancel}>Cancel</CustomButton>
                  <CustomButton onClick={HandleBan}>Ban</CustomButton>
                  <CustomButton onClick={HandleFinish}>Finish</CustomButton>
                </ButtonDiv>
              </OtpWrapper>
            </Main>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Products;
