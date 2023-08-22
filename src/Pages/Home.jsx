import styled from "styled-components";
import image from "../assets/image.png"
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
  display: flex;
 
  align-items: center;
  justify-content: space-around;
  gap: 4rem;
  width: 60%;
  margin: auto;
  height: 90vh;
  @media (max-width:1000px ) {
   
    padding: 1.5em ;
    width:100% !important; 
    flex-direction:column;
    };
    @media screen and (max-width:1400px) {
  width: 70%;
}
`;
const ContentDiv = styled.div``;
const MainHeading = styled.h1``;

const Small = styled.h4``;
const Button = styled.button`
width: 50%;
height: 4%;
cursor: pointer;
border-radius: 10px 0;
border:none;
&:hover{
  transform: scale(1.1);
}
`;
const Left = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: auto;
  height: 90vh;
  @media screen and (max-width:1400px) {
  
 }
`
const Right = styled.div`
 @media screen and (max-width:1000px) {
  display: none;
 }
`

const Span = styled.span`
color : ${props=>props.color};
`

const Home = ({isLoggedIn}) => {
  const navigate = useNavigate()

  const handleGetStarted = ()=>{
    if(isLoggedIn){
      navigate("/dashboard")
    }
    else{
      navigate("/login")
    }
  }

  return (
    <>
      <Wrapper>
      <Left>

     
        <ContentDiv>
          <MainHeading>
             Unlock Privacy with <Span color="rgba(232,173,46,1)">Temporary Phone Numbers!</Span>
          </MainHeading>
          <Small>
          <Span >

          Protect Your Privacy:</Span> Get Temporary Phone Numbers for OTP Verification with our SAS Web App. Keep your real number private while ensuring seamless verification. Try it now!
          </Small>
        </ContentDiv>
        <Button onClick={handleGetStarted}>Get Started</Button>
        </Left>
        <Right>
          <img className="img" src={image} alt="phone" />{" "}
        </Right>
      </Wrapper>
    </>
  );
};

export default Home;
