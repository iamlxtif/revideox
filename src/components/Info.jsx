import React from 'react';
import Illustration from '../assets/illustration2.svg';
import devider from '../assets/line.svg';
import { Box, Grid, Typography } from '@mui/material';


const Info = () => {
  return (
    <Box sx={{ width: '100vw' }}>
      <Grid container spacing={10} sx={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: {sm: '6rem', xs: '6rem 2rem'},
        }}>
        <Grid item sx={{
          justifyContent: "center",
          alignItems: "center",
          display: { xs: 'none', sm: 'none', md: 'flex' }
        }}
        >
          <img src={Illustration} style={{
            width: '30vw'
          }}/>
        </Grid>
        <Grid item sm={12} md={6} sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          <Typography 
            variant='h1'
            sx={{
              fontSize: '3rem',
              fontWeight: '500',
              marginBottom: '0rem',
              color: '#30448c'
            }}
          >
            WHY RevideoX
          </Typography>
          <img src={devider}alt="" style={{
            width: '200px'
          }}/>
          <br />
          <Typography
            variant='p'
            sx={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              fontWeight: '500',
              color: '#30448c'
            }}
          >
            RevideoX is the ultimate multimedia editing and conversion app. With a simple interface and powerful FFmpeg engine, it's the perfect tool for all your video and audio needs.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

/* const HeaderContainer = styled.header`
  display: flex;
  align-items: center ;
  justify-content: space-between;
  height: 100vh;
  margin: 0rem 2vw;
  margin-left: 10vw;
  margin-top: 5vw;
`;

const HeaderIllustration = styled.div`
  width: 80vw;
  height: 100vh;
  background-image: url(${headerIllustration});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-right: 10rem;
  @media screen and (max-width: 800px) {
    display: none;
    transition: all 0.3s ease-in-out;
  }
`;

const HeaderContent = styled.div`
  width: 100vw;
  text-align: left;

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
  margin-bottom: 0rem;
`;

const HeaderParagraph = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
`;
;
 */
export default Info;