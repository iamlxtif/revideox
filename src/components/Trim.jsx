import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Box, Typography, CircularProgress } from "@mui/material";
import {ffmpeg} from '../App'


const Trim = (props) => {
  const { fileType } = props;
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [duration, setDuration] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDownloadUrl(null);
  };

  const handleStartPointChange = (event) => {
    setStartPoint(event.target.value);
    setDownloadUrl(null);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    setDownloadUrl(null);
  };

  const handleTrimVideo = () => {
    // Check if all inputs are selected
    if (!selectedFile || !startPoint || !duration) {
      return;
    }
    setShowLoading(true);
    // Convert the selected file into an ArrayBuffer
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = async (event) => {
      const { result } = event.target;
      const inputFileName = selectedFile.name;
      let inputFormat = inputFileName.substring(inputFileName.lastIndexOf(".") + 1);

      ffmpeg.FS("writeFile", "input." + inputFormat, new Uint8Array(result));

      if(fileType == 'video'){
        // Trim the video
        await ffmpeg.run(
          "-i",
          "input." + inputFormat,
          "-ss",
          startPoint.toString(),
          "-t",
          duration.toString(),
          "output." + inputFormat,
        );
      } else {
        await ffmpeg.run(
          '-i',
          'input.' + inputFormat,
          '-ss',
          startPoint.toString(),
          '-t',
          duration.toString(),
          '-c',
          'copy',
          'output.' + inputFormat
        )
      }

      // Get the trimmed video as a Blob and create a download link for it
      const data = ffmpeg.FS("readFile", "output." + inputFormat);
      let blob = undefined;
      if(fileType == 'video') {blob = new Blob([data.buffer], { type: "video" });}
      else {blob = new Blob([data.buffer], { type: "audio" });}
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
    let inputFormat = inputFileName.substring(inputFileName.lastIndexOf(".") + 1);
    link.download = "trimmed." + inputFormat;
    link.click();
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}sx={{
        alignItems: 'center',
      }}>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={2} sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{
                fontWeight: "bold",
                marginBottom: "16px",
                color: "#30448c"
              }}
              >
                Trimming
              </Typography>
            </Grid>
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
              {fileType == "video" && (
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
              ) || (
                <Button
                  variant="contained"
                  onClick={handleTrimVideo}
                  sx={{
                    backgroundColor: "#30448c",
                    color: "white"
                  }}
                >
                  Trim Audio
                </Button>
              )}
            </Grid>
            {showLoading &&(
              <Grid item xs={12} sx={{ color: '#30448c' }}>
                <CircularProgress color="inherit" size={30} />
              </Grid>
            )}
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
                {downloadUrl && (fileType == "video" &&(
                  <video
                    src={downloadUrl}
                    controls
                    style={{ width: "100%", height: "100%" }}
                  />
                )) || (fileType == "audio" &&(
                  <audio
                    src={downloadUrl}
                    controls
                  />
                ))}
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

export default Trim;