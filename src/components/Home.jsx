import React from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';
import Illustration from '../assets/pfeVid.svg';
import Bg from '../assets/background.svg'
import ToolsHeader from './ToolsHeader';
import Tools from './Tools';
import About from './About';
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <>
      <div style={{ backgroundColor: 'white', width: '100vw' }}>
        <Box sx={{
          backgroundImage: `url(${Bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100%',
          position: 'relative',
          paddingBottom: '5rem'
        }}>
          <Grid container spacing={10} sx={{
            justifyContent: "center",
            alignItems: "center",
            padding: { sm: '6rem', xs: '6rem 2rem'},
            }}
          >
            <Grid item sm={12} md={6} sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: {xs: 'center', sm: 'center', md: 'left'}
            }}
            >
              <Typography variant='h3' sx={{
                fontSize: {xs: '2rem', sm: '3rem'},
                marginBottom: '0.3rem',
                color: "white"
              }}>Fast, Easy, and Effective</Typography>
              <Typography variant='p' sx={{
                fontSize: '1rem',
                marginBottom: '1.5rem',
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                fontWeight: '400',
                color: "white"
              }}>
                Easy multimedia editing and conversion using FFmpeg engine.
              </Typography>
              <br />
              <Button component={Link} to={'/Tools'} sx={{
                background: 'linear-gradient(135deg, #ff9800, #ff6000)',
                color: '#fff',
                padding: '0.5rem 1rem',
                marginRight: '1rem',
                marginLeft: '1rem',
                border: 'none',
                borderRadius: '2rem',
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '1rem',
                '&:hover':{
                  transition: 'all 0.3s ease-in-out',
                  transform: 'scale(1.1)',
                  marginRight: '2rem'
                }
              }}>Get Started</Button>
              <Button sx={{
                border: "1px solid #ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "2rem",
                fontSize: "0.9rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "#fff",
                marginTop: '1rem',
                "&:hover": {
                  backgroundColor: 'black',
                  color: 'white',
                  transition: 'all 0.3s ease-in-out',
                  transform: 'scale(1.1)',
                  border: 'transparent'
              }
              }}>More Information</Button>
            </Grid>
            <Grid item sx={{
              justifyContent: "center",
              alignItems: "center",
              display: { xs: 'none', sm: 'none', md: 'flex' }
            }}
            >
              <img src={Illustration} style={{width: "28vw"}} alt="" />
            </Grid>
          </Grid>
        </Box>
      </div>
      <ToolsHeader />
      <Tools />
      <About />
    </>
  );
};
export default Home;


/* const HeaderContainer = styled.header`
  display: flex;
  align-items: center ;
  justify-content: space-between;
  height: 100vh;
  margin: -5.5rem 10vw;
  z-index: 1;
  @media screen and (max-width: 800px) {
    margin: 0rem 10vw;
  }
`;

const HeaderIllustration = styled.div`
  width: 80vw;
  height: 100vh;
  background-image: url(${headerIllustration});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  @media screen and (max-width: 800px) {
    display: none;
    transition: all 0.3s ease-in-out;
  }
`;

const HeaderContent = styled.div`
  width: 100vw;
  text-align: left;
  color: #fff;
  margin-right: 5rem;
  @media screen and (max-width: 800px) {
    width: 100vw;
    height: 100vh;
    margin-right: 0;
    transition: all 0.3s ease-in-out;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.3rem;`;

const HeaderParagraph = styled.p`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
`;

const HeaderButtons = styled.div`
  display: flex;
  @media screen and (max-width: 800px) {
    flex-direction: column;
      
  }
`;

const GetStartedButton = styled.button`
  background: linear-gradient(135deg, #ff9800, #ff6000);
  color: #fff;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border: none;
  border-radius: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    margin-bottom: 1rem;    
    margin-right: 0rem;
  }
  &:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.1);
    margin-right: 2rem;
  }
`;

const MoreSelectionButton = styled.button`
  border: 1px solid #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  @media screen and (max-width: 800px) {
    margin-bottom: 1rem;    
    margin-right: 0rem;color: black;
    border: 1px solid black;
  }
  &:hover {
    background-color: black;
    color: white;
    transition: all 0.3s ease-in-out;
    transform: scale(1.1);
    border: transparent;
  }
`; */


