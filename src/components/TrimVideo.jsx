import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, TextField, Box, Typography } from "@mui/material";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import {ffmpeg} from '../App'


const TrimVideo = () => {
  
  const [ready,setReady] = useState (false); 
  // const load = async ()=>{
  //   await ffmpeg.load();
  //   setReady(true);
  // }

  // useEffect (()=>{
  //   load();
  // },[]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [duration, setDuration] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleStartPointChange = (event) => {
    setStartPoint(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  
  const handleTrimVideo = () => {
    // Check if all inputs are selected
    if (!selectedFile || !startPoint || !duration) {
      return;
    }

    // Convert the selected file into an ArrayBuffer
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = async (event) => {

      const inputUrl = event.target.result;
    
      // Trim the video
      await ffmpeg.run(
        "-i",
        inputUrl,
        "-ss",
        startPoint.toString(),
        "-t",
        duration.toString(),
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        "-strict",
        "-2",
        "-b:a",
        "384k",
        "-b:v",
        "1000k",
        "output.mp4"
      );

      // Get the trimmed video as a Blob and create a download link for it
      const data = ffmpeg.FS("readFile", "output.mp4");
      const blob = new Blob([data.buffer], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Clean up temporary files
      ffmpeg.FS("unlink", "output.mp4");
    };
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "trimmed_video.mp4";
    link.click();
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{
        fontWeight: "bold",
        marginBottom: "16px",
        color: "#30448c"
      }}
      >
        Trimming
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Starting Point (in seconds)"
                type="number"
                onChange={handleStartPointChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Duration (in seconds)"
                type="number"
                onChange={handleDurationChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleTrimVideo}
                sx={{
                  backgroundColor: "#30448c",
                  color: "white"
                }}
              >
                Trim Video
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
                  justifyContent: "center"
                }}
              >
                {downloadUrl && (
                  <video
                    src={downloadUrl}
                    controls
                    style={{ width: "100%", height: "100%" }}
                  />
                ) || (
                  <Typography sx={{ color: "#9e9e9e" }}>YOUR TRIMMED VIDEO</Typography>
                )}
              </Box>
              {downloadUrl && (
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
              )}
            </Grid>
          
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default TrimVideo;