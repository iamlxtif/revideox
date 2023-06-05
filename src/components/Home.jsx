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
                Easy multimedia editing and conversion application.
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
              <Button component={Link} to={'/About'}sx={{
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

