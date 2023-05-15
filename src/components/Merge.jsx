import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, TextField, Box, Typography } from "@mui/material";
import {ffmpeg} from '../App'


const Merge = (props) => {
  const { fileType } = props;
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [duration, setDuration] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  
  let inputFormat = "";
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length < 2) {
      alert("You have to upload 2 files at least to merge them");
      return;
    }
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };
  
  useEffect(() => {
    console.log(selectedFiles.length);
    console.log(selectedFiles);
  }, [selectedFiles]);
  

  const handleMerge = async () => {
    let inputFormat = "";
    for (const selectedFile of selectedFiles) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
  
      reader.onload = async (event) => {
        const { result } = event.target;
        const inputFileName = selectedFile.name;
        inputFormat = inputFileName.substring(inputFileName.lastIndexOf(".") + 1);
  
        ffmpeg.FS("writeFile", "input." + inputFormat, new Uint8Array(result));
      };
  
      await new Promise((resolve) => {
        reader.onloadend = resolve;
      });
    }
  
    const mergeCommands = selectedFiles.map((selectedFile, index) => {
      const inputFileName = selectedFile.name;
      inputFormat = inputFileName.substring(inputFileName.lastIndexOf(".") + 1);
      return `-i input.${inputFormat}`;
    });
  
    const mergeOutput = mergeCommands.join(" ");
    await ffmpeg.run(
      mergeOutput,
      "-filter_complex",
      "concat=n=" + selectedFiles.length + ":v=1:a=1",
      "-c:v",
      "copy",
      "-c:a",
      "copy",
      "output." + inputFormat
    );
  
  
    // Clean up temporary files
      const data = ffmpeg.FS("readFile", "output." + inputFormat);
      let blob = undefined;
      if(fileType == 'video') {blob = new Blob([data.buffer], { type: "video" });}
      else {blob = new Blob([data.buffer], { type: "audio" });}
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Clean up temporary files
      ffmpeg.FS("unlink", "input." + inputFormat);
      ffmpeg.FS("unlink", "output." + inputFormat);
  };
  

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    if(fileType == 'video') {link.download = "Merged.mp4";}
    else {link.download = "Merged.mp3";}
    link.click();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{
        fontWeight: "bold",
        marginBottom: "16px",
        color: "#30448c"
      }}
      >
        Merge
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField type="file" inputProps={{ multiple: true }} onChange={handleFileChange} />
            </Grid>
            
            
            <Grid item xs={12}>
              {fileType == "video" && (
                <Button
                  variant="contained"
                  onClick={handleMerge}
                  sx={{
                    backgroundColor: "#30448c",
                    color: "white"
                  }}
                >
                  Merge Video
                </Button>
              ) || (
                <Button
                  variant="contained"
                  onClick={handleMerge}
                  sx={{
                    backgroundColor: "#30448c",
                    color: "white"
                  }}
                >
                  Merge Audio
                </Button>
              )}
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
                  Merge
                </Button>
              )}
            </Grid>
          
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default Merge;