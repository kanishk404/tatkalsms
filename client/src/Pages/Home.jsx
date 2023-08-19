import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 50%;
  margin: auto;
  height: 90vh;
`;
const ContentDiv = styled.div``;
const MainHeading = styled.h1``;

const Small = styled.h4``;
const Button = styled.button`
width: 50%;
height: 4%;
cursor: pointer;
border-radius: 10px;
`;

const Home = () => {
  return (
    <>
      <Wrapper>
        <ContentDiv>
          <MainHeading>
             Unlock Privacy with Temporary Phone Numbers!
          </MainHeading>
          <Small>
            Tired of sharing your personal number everywhere? Keep your privacy
            intact while staying connected with our innovative solution. Our SAS
            web app offers a seamless way to obtain temporary phone numbers for
            OTP verification. Safeguard your real number and experience
            hassle-free verification with confidence.
          </Small>
        </ContentDiv>
        <Button>Get Started</Button>
      </Wrapper>
    </>
  );
};

export default Home;
