import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import trim from '../assets/icons/VideoTools/trim.png';
import merge from '../assets/icons/VideoTools/merge.png';
import rotate from '../assets/icons/VideoTools/rotate.png';
import compress from '../assets/icons/VideoTools/compress.png';
import video from '../assets/icons/VideoTools/video.png';
import VidAud from '../assets/icons/AudioTools/VidAud.png';
import audio from '../assets/icons/AudioTools/audio.png';
import speed from '../assets/icons/AudioTools/speed.png';





const Tools = () => {
    
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                marginTop: '10vh',
                zIndex: '0'
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
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            marginLeft: '0.5rem',
                            fontSize: '1.3rem'
                        }}>Video tools</Typography>
                        <Stack direction='column'>
                        {videoTools.map((videoTool) => (
                            <Button key={videoTool.key} component={Link} to={videoTool.path} sx={{
                                color: '#044cbc',
                                justifyContent: 'flex-start',
                                fontSize: '0.9rem',
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
                            <Button key={audioTool.key} component={Link} to={audioTool.path} sx={{
                                color: '#044cbc',
                                justifyContent: 'flex-start',
                                fontSize: '0.9rem',
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
                            <Button key={convertToVideoTool.key} component={Link} to={convertToVideoTool.path}
                            sx={{
                                color: '#044cbc',
                                justifyContent: 'flex-start',
                                fontSize: '0.9rem',
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
                            <Button key={convertToAudioTool.key} component={Link} to={convertToAudioTool.path} sx={{
                                color: '#044cbc',
                                justifyContent: 'flex-start',
                                fontSize: '0.9rem',
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
        </>
    )
}

const videoTools = [
    {
        key: '1',
        name: 'Trim video',
        path: '/trimVideo',
        icon: trim,
    },
    {
        key: '2',
        name: 'Merge video',
        path: '/mergeVideo',
        icon: merge,
    },
    {
        key: '3',
        name: 'Rotate video',
        path: '/trim',
        icon: rotate ,

    },
    {
        key: '4',
        name: 'Compress video',
        path: '/trim',
        icon: compress ,
    },
    {
        key: '5',
        name: 'Reverse video',
        path: '/reverse',
        icon: video ,
    }
]

const audioTools = [
    {
        key: '5',
        name: 'Trim audio',
        path: '/trimAudio',
        icon: trim,

    },
    {
        key: '6',
        name: 'Merge audio',
        path: '/mergeAudio',
        icon: merge,
    },
    {
        key: '7',
        name: 'Extract audio from video',
        path: '/trim',
        icon: VidAud,
    },
    {
        key: '8',
        name: 'Change audio speed',
        path: '/audioSpeed',
        icon: speed,
    }
]

const convertToVideoTools = [
    {
        key: '9',
        name: 'Convert to MP4',
        path: '/convertToMp4',
        icon: video,
    },
    {
        key: '10',
        name: 'Convert to WEBM',
        path: '/convertToWebm',
        icon: video,
    },
    {
        key: '11',
        name: 'Convert to MOV',
        path: '/convertToMov',
        icon: video,
    },
    {
        key: '12',
        name: 'Convert to AVI',
        path: '/convertToAvi',
        icon: video,
    },
    {
        key: '13',
        name: 'Convert to MKV',
        path: '/convertToMkv',
        icon: video,
    },
]

const convertToAudioTools = [
    {
        key: '14',
        name: 'Convert to MP3',
        path: '/convertToMp3',
        icon: audio,
    },
    {
        key: '15',
        name: 'Convert to WAV',
        path: '/convertToWav',
        icon: audio,
    },
    {
        key: '16',
        name: 'Convert to M4A',
        path: '/convertToM4a',
        icon: audio,
    },
    {
        key: '17',
        name: 'Convert to OGG',
        path: '/convertToOgg',
        icon: audio,
    },
    {
        key: '18',
        name: 'Convert to AAC',
        path: '/convertToAac',
        icon: audio,
    },
    {
        key: '19',
        name: 'Convert to FLAC',
        path: '/convertToFlac',
        icon: audio,
    },
]

export default Tools