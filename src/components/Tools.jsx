import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import TrimVideo from './TrimVideo'
import devider from '../assets/line2.svg';

const Tools = () => {

    return (
        <>
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
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
            }}>
                <Grid container sx={{  paddingLeft: {xs: '2rem', sm: '5rem'} }}>
                    <Grid item xs={12} sm={6} md={6} lg={3} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginBottom: '4rem'
                    }}>
                        <Typography variant='h8' sx={{
                            color: '#30448c',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                        }}>Video tools</Typography>
                        <Stack direction='column'>
                        {videoTools.map((videoTool) => (
                            <Button sx={{
                                color: '#30448c',
                                justifyContent: 'flex-start',
                                '&:hover':{
                                    backgroundColor: '#30448c',
                                    color: 'white',
                                    transition: 'all 0.3s ease-in-out',
                                }
                            }}>
                                {videoTool.name}
                            </Button>
                        ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={3} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginBottom: '4rem'
                    }}>
                        <Typography variant='h8' sx={{
                            color: '#30448c',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginBottom: '1rem'
                        }}>Audio tools</Typography>
                        <Stack direction='column'>
                        {audioTools.map((audioTool) => (
                            <Button sx={{
                                color: '#30448c',
                                justifyContent: 'flex-start',
                                '&:hover':{
                                    backgroundColor: '#30448c',
                                    color: 'white',
                                    transition: 'all 0.3s ease-in-out'
                                }
                            }}>
                                {audioTool.name}
                            </Button>
                        ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={3} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginBottom: '4rem'
                    }}>
                        <Typography variant='h8' sx={{
                            color: '#30448c',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginBottom: '1rem'
                        }}>Convert from video</Typography>
                        <Stack direction='column'>
                        {convertFromVideoTools.map((convertFromVideoTool) => (
                            <Button sx={{
                                color: '#30448c',
                                justifyContent: 'flex-start',
                                '&:hover':{
                                    backgroundColor: '#30448c',
                                    color: 'white',
                                    transition: 'all 0.3s ease-in-out'
                                }
                            }}>
                                {convertFromVideoTool.name}
                            </Button>
                        ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={3} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginBottom: '4rem'
                    }}>
                        <Typography variant='h8' sx={{
                            color: '#30448c',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginBottom: '1rem'
                        }}>Convert from audio</Typography>
                        <Stack direction='column'>
                        {convertFromAudioTools.map((convertFromAudioTool) => (
                            <Button sx={{
                                color: '#30448c',
                                justifyContent: 'flex-start',
                                '&:hover':{
                                    backgroundColor: '#30448c',
                                    color: 'white',
                                    transition: 'all 0s ease-in-out'
                                }
                            }}>
                                {convertFromAudioTool.name}
                            </Button>
                        ))}
                        </Stack>
                    </Grid>
                </Grid> 
            </Box>
        </>
    )
}

const videoTools = [
    {
        key: '1',
        name: 'Trim video',
        component: <TrimVideo />
    },
    {
        key: '2',
        name: 'Merge video',
        component: <TrimVideo />
    },
    {
        key: '3',
        name: 'Rotate video',
        component: <TrimVideo />
    },
    {
        key: '4',
        name: 'Compress video',
        component: <TrimVideo />
    }
]

const audioTools = [
    {
        key: '5',
        name: 'Trim audio',
        component: <TrimVideo />
    },
    {
        key: '6',
        name: 'Merge audio',
        component: <TrimVideo />
    },
    {
        key: '7',
        name: 'Add audio to video',
        component: <TrimVideo />
    }
]

const convertFromVideoTools = [
    {
        key: '8',
        name: 'Convert MP4 to MOV',
        component: <TrimVideo />
    },
    {
        key: '9',
        name: 'Convert MP4 to WEBM',
        component: <TrimVideo />
    },
    {
        key: '10',
        name: 'Convert MOV to MP4',
        component: <TrimVideo />
    },
    {
        key: '11',
        name: 'Convert WEBM to MP4',
        component: <TrimVideo />
    },
    {
        key: '12',
        name: 'Convert MP4 to MP3',
        component: <TrimVideo />
    },
    {
        key: '13',
        name: 'Convert MP4 to GIF',
        component: <TrimVideo />
    }
]

const convertFromAudioTools = [
    {
        key: '14',
        name: 'Convert MP3 to WAV',
        component: <TrimVideo />
    },
    {
        key: '15',
        name: 'Convert WAV to FLAC',
        component: <TrimVideo />
    },
    {
        key: '16',
        name: 'Convert M4A to MP3',
        component: <TrimVideo />
    },
    {
        key: '17',
        name: 'Convert AAC to OGG',
        component: <TrimVideo />
    }
]

export default Tools