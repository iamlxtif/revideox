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

const Convert = (props) => {
    const { toFormat } = props;
    const fileType = toFormat.charAt(0);
    const outputFormat = toFormat.slice(1);

    const [selectedFile, setSelectedFile] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [showLoading, setShowLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setDownloadUrl(null);
    };

    const handleConvertVideo = () => {
        // Check if all inputs are selected
        if (!selectedFile) {
            return;
        }
        setShowLoading(true);
        // Convert the selected file into an ArrayBuffer
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        reader.onload = async (event) => {
            const { result } = event.target;
            const inputFileName = selectedFile.name;
            let inputFormat = inputFileName.substring(
                inputFileName.lastIndexOf(".") + 1
            );

            ffmpeg.FS("writeFile", "input." + inputFormat, new Uint8Array(result));

            if (fileType == "a") {
                // Convert the file
                if (outputFormat == 'mp3') {
                    await ffmpeg.run(
                        "-i",
                        "input." + inputFormat,
                        "-c:a",
                        "libmp3lame",
                        "-q:a",
                        "2",
                        "output." + outputFormat
                    );
                }
                else if (outputFormat == 'wav') {
                    await ffmpeg.run(
                        "-i",
                        "input." + inputFormat,
                        "-c:a",
                        "pcm_s16le",
                        "output." + outputFormat
                    );
                }
                else if (outputFormat == 'm4a' || outputFormat == 'aac') {
                    await ffmpeg.run(
                        "-i",
                        "input." + inputFormat,
                        "-c:a",
                        "aac",
                        "-b:a",
                        "256k",
                        "output." + outputFormat
                    );
                } 
                else if (outputFormat == 'ogg') {
                    await ffmpeg.run(
                        "-i",
                        "input." + inputFormat,
                        "-c:a",
                        "libvorbis",
                        "-q:a",
                        "4",
                        "output." + outputFormat
                    );
                }  
                else if (outputFormat == 'flac') {
                    await ffmpeg.run(
                        "-i",
                        "input." + inputFormat,
                        "-c:a",
                        "flac",
                        "output." + outputFormat
                    );
                }  
            } else {
                if (outputFormat == 'mp4'||outputFormat == 'mkv'||outputFormat == 'mov') {
                    await ffmpeg.run(
                        "-i",
                        "input." + inputFormat,
                        "-c:v",
                        "libx264",
                        "-c:a",
                        "aac",
                        "output." + outputFormat
                    );
                }
                else if (outputFormat == 'webm') {
                    await ffmpeg.run(
                        "-i",
                        "input." + inputFormat,
                        "-c:v",
                        "libvpx-vp9",
                        "-c:a",
                        "libvorbis",
                        "output." + outputFormat
                    );
                }
                else if (outputFormat == 'avi') {
                    await ffmpeg.run(
                        "-i",
                        "input." + inputFormat,
                        "-c:v",
                        "libxvid",
                        "-c:a",
                        "mp3",
                        "output." + outputFormat
                    );
                }
            }

            // Get the Converted file as a Blob and create a download link for it
            const data = ffmpeg.FS("readFile", "output." + outputFormat);
            let blob = undefined;
            if (fileType == "v") {
                blob = new Blob([data.buffer], { type: "video" });
            } else {
                blob = new Blob([data.buffer], { type: "audio" });
            }
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);
            setShowLoading(false);

            // Clean up temporary files
            ffmpeg.FS("unlink", "input." + inputFormat);
            ffmpeg.FS("unlink", "output." + outputFormat);
        };
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "Converted." + outputFormat;
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
                Converting
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
                        onClick={handleConvertVideo}
                        sx={{
                            backgroundColor: "#30448c",
                            color: "white",
                        }}
                    >
                        Convert
                    </Button>
                </Grid>
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
                {showLoading &&(
                    <Grid item xs={12} sx={{ color: '#30448c' }}>
                        <CircularProgress color="inherit" size={30} />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Convert;

