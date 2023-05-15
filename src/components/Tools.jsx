import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom";
import TrimVideo from './TrimVideo'
import { useState, useEffect } from 'react';
import trim from '../assets/icons/VideoTools/trim.png';
import merge from '../assets/icons/VideoTools/merge.png';
import rotate from '../assets/icons/VideoTools/rotate.png';
import compress from '../assets/icons/VideoTools/compress.png';
import convertAUD from '../assets/icons/AudioTools/convert2.png';
import video from '../assets/icons/VideoTools/video.png';
import VidAud from '../assets/icons/AudioTools/VidAud.png';
import audio from '../assets/icons/AudioTools/audio.png';




const Tools = () => {
    

    const [showTrimVideo, setShowTrimVideo] = useState(false);

    const handleButtonClick = () => {
    setShowTrimVideo(!showTrimVideo);
    };

    return (
        <>
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
                            color: '#044cbc',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            marginLeft: '0.5rem',
                            fontSize: '1.3rem'
                        }}>Video tools</Typography>
                        <Stack direction='column'>
                        {videoTools.map((videoTool) => (
                            <Button key={videoTool.key} onClick={handleButtonClick}  sx={{
                                color: '#044cbc',
                                justifyContent: 'flex-start',
                                '&:hover':{
                                    backgroundColor: '#044cbc',
                                    color: 'white',
                                    transition: 'all 0.3s ease-in-out',
                                }
                            }}>
                                <img 
                                    style={{width: '40px', padding :'0.5rem', paddingLeft: '0'}} 
                                    src={videoTool.icon}
                                    alt=""
                                />
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
                            color: '#044cbc',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            marginLeft: '0.5rem',
                            fontSize: '1.3rem'
                        }}>Audio tools</Typography>
                        <Stack direction='column'>
                        {audioTools.map((audioTool) => (
                            <Button key={audioTool.key} sx={{
                                color: '#044cbc',
                                justifyContent: 'flex-start',
                                '&:hover':{
                                    backgroundColor: '#044cbc',
                                    color: 'white',
                                    transition: 'all 0.3s ease-in-out'
                                }
                            }}>
                                <img 
                                    style={{width: '40px', padding :'0.5rem', paddingLeft: '0',}} 
                                    src={audioTool.icon}
                                    alt=""
                                />
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
                            color: '#044cbc',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            marginLeft: '0.5rem',
                            fontSize: '1.3rem'
                        }}>Convert to video</Typography>
                        <Stack direction='column'>
                        {convertToVideoTools.map((convertToVideoTool) => (
                            <Button key={convertToVideoTool.key} sx={{
                                color: '#044cbc',
                                justifyContent: 'flex-start',
                                '&:hover':{
                                    backgroundColor: '#044cbc',
                                    color: 'white',
                                    transition: 'all 0.3s ease-in-out'
                                }
                            }}>
                                <img 
                                    style={{width: '40px', padding :'0.5rem', paddingLeft: '0',}} 
                                    src={convertToVideoTool.icon}
                                    alt=""
                                />
                                {convertToVideoTool.name}
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
                            color: '#044cbc',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            marginLeft: '0.5rem',
                            fontSize: '1.3rem'
                        }}>Convert to audio</Typography>
                        <Stack direction='column'>
                        {convertToAudioTools.map((convertToAudioTool) => (
                            <Button key={convertToAudioTool.key} sx={{
                                color: '#044cbc',
                                justifyContent: 'flex-start',
                                '&:hover':{
                                    backgroundColor: '#044cbc',
                                    color: 'white',
                                    transition: 'all 0s ease-in-out'
                                }
                            }}>
                                <img 
                                    style={{width: '40px', padding :'0.5rem', paddingLeft: '0' }} 
                                    src={convertToAudioTool.icon}
                                    alt=""
                                />
                                {convertToAudioTool.name}
                            </Button>
                        ))}
                        </Stack>
                    </Grid>
                </Grid> 
            </Box>
            {showTrimVideo && <TrimVideo />}
        </>
    )
}

const videoTools = [
    {
        key: '1',
        name: 'Trim video',
        component: <TrimVideo />,
        icon: trim,
    },
    {
        key: '2',
        name: 'Merge video',
        component: <TrimVideo />,
        icon: merge,
    },
    {
        key: '3',
        name: 'Rotate video',
        component: <TrimVideo />,
        icon: rotate ,

    },
    {
        key: '4',
        name: 'Compress video',
        component: <TrimVideo />,
        icon: compress ,
    },
    {
        key: '5',
        name: 'Reverse video',
        component: <TrimVideo />,
        icon: video ,
    }
]

const audioTools = [
    {
        key: '5',
        name: 'Trim audio',
        component: <TrimVideo />,
        icon: trim,

    },
    {
        key: '6',
        name: 'Merge audio',
        component: <TrimVideo />,
        icon: merge,
    },
    {
        key: '7',
        name: 'Extract audio from video',
        component: <TrimVideo />,
        icon: VidAud,
    },
    {
        key: '8',
        name: 'Change audio speed',
        component: <TrimVideo />,
        icon: audio,
    }
]

const convertToVideoTools = [
    {
        key: '9',
        name: 'Convert to MP4',
        component: <TrimVideo />,
        icon: video,
    },
    {
        key: '10',
        name: 'Convert to WEBM',
        component: <TrimVideo />,
        icon: video,
    },
    {
        key: '11',
        name: 'Convert to MOV',
        component: <TrimVideo />,
        icon: video,
    },
    {
        key: '12',
        name: 'Convert to AVI',
        component: <TrimVideo />,
        icon: video,
    },
    {
        key: '13',
        name: 'Convert to MKV',
        component: <TrimVideo />,
        icon: video,
    },
]

const convertToAudioTools = [
    {
        key: '14',
        name: 'Convert to MP3',
        component: <TrimVideo />,
        icon: audio,
    },
    {
        key: '15',
        name: 'Convert to WAV',
        component: <TrimVideo />,
        icon: audio,
    },
    {
        key: '16',
        name: 'Convert to M4A',
        component: <TrimVideo />,
        icon: audio,
    },
    {
        key: '17',
        name: 'Convert to OGG',
        component: <TrimVideo />,
        icon: audio,
    },
    {
        key: '18',
        name: 'Convert to ACC',
        component: <TrimVideo />,
        icon: audio,
    },
    {
        key: '19',
        name: 'Convert to FLAC',
        component: <TrimVideo />,
        icon: audio,
    },
]

export default Tools