import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import devider from '../assets/line2.svg';


const ToolsHeader = () => {
  return (
    <Box
                sx={{
                    width: '70vw',
                    diplay: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: {xs: '5rem 2rem', sm: '5rem'}
                    
                }}
            >
                <Typography variant='h1' sx={{
                    fontSize: {xs: '2rem' , sm: "3rem"},
                    fontWeight: '500',
                    marginBottom: "0.3rem",
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    color: '#30448c'
                }}>
                    RevideoX Tools
                </Typography>
                <img src={devider} alt="" style={{ width: '270px' }}/>
            </Box>
  )
}

export default ToolsHeader;