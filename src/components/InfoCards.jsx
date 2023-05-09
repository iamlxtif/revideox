import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import '../App.css';
import devider from '../assets/line2.svg';
import styled from 'styled-components';

const HeaderTitle = styled.h1`
font-size: 4rem;
margin-bottom: 0.3rem;
margin-left: 5rem;
display: flex;
align-items: flex-start;
flex-direction: column;
`;

const Icon = styled.img`
    height: 50px;
`


const InfoCards = () => {

    const cards = [
        {
            key: "1",
            name : "Multimedia Editing",
            description : "Edit and enhance your videos, audio, and images with an easy-to-use interface and a wide range of tools and effects.",
            icon: <Icon src={icon1} alt="My Image" />,
        },
        {
            key: "2",
            name : "Powerful Conversion",
            description : "Quickly and easily convert your media files to a variety of formats with our powerful FFmpeg engine, ensuring excellent output every time.",
            icon: <Icon src={icon3} alt="My Image"/>,
        },
        {
            key: "3",
            name : "Streamlined Workflow",
            description : "Enjoy a streamlined workflow with efficient file handling, drag-and-drop functionality, and batch processing capabilities.",
            icon: <Icon src={icon2} alt="My Image"  />,
        },
        
        
]


    return (
        <>
            <Box
                sx={{
                    width: '70vw',
                    diplay: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: {xs: '2rem', sm: '5rem'}
                }}
            >
                <Typography variant='h1' sx={{
                    fontSize: {xs: '2rem' , sm: "4rem"},
                    fontWeight: '500',
                    marginBottom: "0.3rem",
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    color: '#30448c'
                }}>
                    WHY RevideoX
                </Typography>
                <img src={devider} alt="" style={{ width: '270px' }}/>
            </Box>
            <Grid container spacing={5}
                sx={{
                    padding: {lg: "50px", md: "50px 200px", sm: '50px 100px', xs:'50px'}
                }}
            >
                
                {cards.map((card) => (
                    <Grid key={card.key} item xs={12} sm={12} md={12} lg={4}>
                        <Card sx={{
                            height: '100%',
                            transition: 'background-color 0.2s ease-in-out',
                            backgroundColor: 'white',
                            boxShadow: '0px 2px 20px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            color: 'black',
                            borderRadius: 3,
                            '&:hover': {
                                backgroundColor: 'rgb(48, 68, 140, 0.05)',
                                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                transform: 'scale(1.02)',
                            },
                        }}>
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flexGrow: 1,
                                textAlign: 'center',
                                padding: '20px 40px'
                            }}>
                                {card.icon}
                                <Typography variant="h5" sx={{
                                    color: '#30448c',
                                    fontWeight: 'bold',
                                    paddingTop: '1.2rem',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    fontSize : '1.7rem'
                                }}>
                                    {card.name}
                                </Typography>
                                <Typography variant="p" sx={{
                                    color: '#30448c',
                                    flexGrow: 1,
                                    fontSize: '1.2rem',
                                    fontWeight: '400',
                                }}>
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default InfoCards