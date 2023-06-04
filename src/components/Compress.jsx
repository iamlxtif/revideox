import React, { useState } from "react";
import {
    Button,
    Container,
    Grid,
    TextField,
    Box,
    Typography,
    CircularProgress,
} from "@mui/material";
import { ffmpeg } from "../App";
import { ErrorOutline } from "@mui/icons-material";

const Compress = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile('');
        setDownloadUrl('');
        setShowError('');
        const file = event.target.files[0];
        if(file){
            const isVideo = file.type.includes('video');
            if (!isVideo) {
                setShowError('Upload a video file !');
            }
            else {
                setSelectedFile(file);
            }
        }
    };

    const handleCompressVideo = () => {
        // Check if all inputs are selected
        if (!selectedFile) {
            setShowError('Upload a video file !');
            return;
        }
        setShowLoading(true);
        // Compress the selected file into an ArrayBuffer
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        reader.onload = async (event) => {
            const { result } = event.target;
            const inputFileName = selectedFile.name;
            let inputFormat = inputFileName.substring(
                inputFileName.lastIndexOf(".") + 1
            );

            ffmpeg.FS("writeFile", "input." + inputFormat, new Uint8Array(result));


            await ffmpeg.run(
                "-i",
                "input." + inputFormat,
                "-c:v",
                "libx264",
                "-crf",
                "23",
                "-c:a",
                "copy",
                "output." + inputFormat
            );


            // Get the Compressed file as a Blob and create a download link for it
            const data = ffmpeg.FS("readFile", "output." + inputFormat);
            let blob = undefined;
            blob = new Blob([data.buffer], { type: "video" });
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);
            setShowLoading(false);

            // Clean up temporary files
            ffmpeg.FS("unlink", "input." + inputFormat);
            ffmpeg.FS("unlink", "output." + inputFormat);
        };
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = downloadUrl;
        const inputFileName = selectedFile.name;
        let inputFormat = inputFileName.substring(
            inputFileName.lastIndexOf(".") + 1
        );
        link.download = "Compressed." + inputFormat;
        link.click();
    };

    return (
        <Container sx={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    marginBottom: "16px",
                    color: "#30448c",
                }}
            >
                Compressing
            </Typography>
            <Grid container spacing={2} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Grid item xs={12}>
                    <TextField type="file" onChange={handleFileChange} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={handleCompressVideo}
                        sx={{
                            backgroundColor: "#30448c",
                            color: "white",
                        }}
                    >
                        Compress
                    </Button>
                </Grid>
                {showError && (
                    <Grid item xs={12} color='red' sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <ErrorOutline size={20} />
                        <Typography variant='p' marginLeft='5px'>
                            {showError}
                        </Typography>
                    </Grid>)}
                {downloadUrl && (
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleDownload}
                            sx={{
                                backgroundColor: "#30448c",
                                color: "white"
                            }}
                        >
                            Download
                        </Button>
                    </Grid>
                )}
                {showLoading && (
                    <Grid item xs={12} sx={{ color: '#30448c' }}>
                        <CircularProgress color="inherit" size={30} />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Compress;

