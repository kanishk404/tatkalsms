import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { data as jsonData } from "../assets/Data.js";
import {
  CountrSelectStyle,
  ServiceSelectStyles,
} from "../styles/SelectStyles.js";
import { useNavigate } from "react-router-dom";

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

  @media screen and (max-width: 1000px) {
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
  border-radius: 10px;
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
    border-radius: 0 10px 10px 0;
    background-color: rgb(71, 55, 28);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover::after {
    opacity: 1;
    background-color: #433218;
  }
`;
const NumberBox = styled.div`
  position: relative;
  width: 60%;
  height: 52px;
  border: none;
  border-radius: 10px;
  background-color: #242424;
  @media screen and (max-width: 1400px) {
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
  position: relative;
  width: 60%;
  height: 62px;
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
  width: 15%;
  height: 40px;
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 0px 2px 2px rgb(58, 59, 59);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    background-color: #433218;
  }
  @media screen and (max-width: 1400px) {
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
  @media screen and (max-width: 1400px) {
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

const Products = ({ isLoggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  const [country, setCountry] = useState("india");
  const [service, setService] = useState(null);
  const [serviceData, setServiceData] = useState(null);
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
        <Wrapper>
          <Main width={"35%"}>
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
                  <BuyButton key={key}>
                    {" "}
                    Buy {key[0].toUpperCase() + key.slice(1, key.length)} -
                    Price: {parseInt(serviceData[key].cost + 24)} Rs
                  </BuyButton>
                ))}
            </ProviderDiv>
          </Main>
          <Main width={"60%"} display={"none"}>
            <OtpWrapper>
              <Heading>Number:</Heading>

              <NumberBox></NumberBox>
              <Heading>SmS and Otps:</Heading>
              <OtpDiv></OtpDiv>
              <ButtonDiv>
                <CustomButton>Cancel</CustomButton>
                <CustomButton>Ban</CustomButton>
                <CustomButton>Finish</CustomButton>
              </ButtonDiv>
            </OtpWrapper>
          </Main>
        </Wrapper>
      )}
    </>
  );
};

export default Products;
