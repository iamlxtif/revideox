import React, { useState } from "react";
import {
    Button,
    Container,
    Grid,
    TextField,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { ffmpeg } from "../App";




const AudioSpeed = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [downloadUrl, setDownloadUrl] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleAudioSpeed = () => {
        // Check if all inputs are selected
        if (!selectedFile || !selectedValue) {
            return;
        }

        // Convert the selected file into an ArrayBuffer
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        reader.onload = async (event) => {
            const { result } = event.target;
            const inputFileName = selectedFile.name;
            let inputFormat = inputFileName.substring(inputFileName.lastIndexOf(".") + 1);

            console.log(inputFormat);

            ffmpeg.FS("writeFile", "input." + inputFormat, new Uint8Array(result));

            await ffmpeg.run(
                "-i",
                "/input." + inputFormat,
                "-filter:a",
                "atempo=" + selectedValue.toString(),
                "/output." + inputFormat
            );
            
            // Get the trimmed video as a Blob and create a download link for it
            const data = ffmpeg.FS("readFile", "output." + inputFormat);
            const blob = new Blob([data.buffer], { type: "audio" });
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);

            // Clean up temporary files
            ffmpeg.FS("unlink", "input." + inputFormat);
            ffmpeg.FS("unlink", "output." + inputFormat);
        };
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = downloadUrl;
        const inputFileName = selectedFile.name;
        let inputFormat = inputFileName.substring(inputFileName.lastIndexOf(".") + 1);
        link.download = "changed." + inputFormat;
        link.click();
    };

    return (
        <Container maxWidth="md">
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    marginBottom: "16px",
                    color: "#30448c",
                }}
            >
                Chaning audio speed
            </Typography>
            <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField type="file" onChange={handleFileChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ width: '200px' }}>
                                <InputLabel id="dropdown-label">Select a speed value</InputLabel>
                                <Select labelId="dropdown-label" id="dropdown" onChange={handleDropdownChange} value={selectedValue}>
                                    <MenuItem value="0.25">x0.25</MenuItem>
                                    <MenuItem value="0.5">x0.5</MenuItem>
                                    <MenuItem value="0.75">x0.75</MenuItem>
                                    <MenuItem value="1.25">x1.25</MenuItem>
                                    <MenuItem value="1.5">x1.5</MenuItem>
                                    <MenuItem value="1.75">x1.75</MenuItem>
                                    <MenuItem value="2.0">x2.0</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={handleAudioSpeed}
                                sx={{
                                    backgroundColor: "#30448c",
                                    color: "white",
                                }}
                            >
                                Change speed
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "400px",
                                border: "2px dashed #9e9e9e",
                                marginBottom: "16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <audio src={downloadUrl} controls />
                        </Box>
                        {downloadUrl && (
                            <Button
                                variant="contained"
                                onClick={handleDownload}
                                sx={{
                                    backgroundColor: "#30448c",
                                    color: "white",
                                }}
                            >
                                Download
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AudioSpeed;
