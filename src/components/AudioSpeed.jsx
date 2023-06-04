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
  CircularProgress,
} from "@mui/material";
import { ffmpeg } from "../App";
import { ErrorOutline, KeyboardArrowDown } from "@mui/icons-material";

const AudioSpeed = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [showDownload, setShowDownload] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile("");
    setDownloadUrl("");
    setShowDownload(false);
    setShowError("");
    const file = event.target.files[0];
    const isAudio = file.type.includes("audio");
    if (!isAudio) {
      setShowError("Upload an audio file !");
    } else {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setDownloadUrl(fileUrl);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
    setShowDownload(false);
    if (showDownload) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setDownloadUrl(fileUrl);
    }
    if (!showError.includes("Upload")) {
      setShowError("");
    }
  };

  const handleAudioSpeed = () => {
    // Check if all inputs are selected
    if (!selectedFile || !selectedValue) {
      if (!showError.includes("Upload")) {
        setShowError("Fill all fields !");
      }
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

      console.log(inputFormat);

      ffmpeg.FS("writeFile", "input." + inputFormat, new Uint8Array(result));

      await ffmpeg.run(
        "-i",
        "/input." + inputFormat,
        "-filter:a",
        "atempo=" + selectedValue,
        "/output." + inputFormat
      );

      // Get the trimmed video as a Blob and create a download link for it
      const data = ffmpeg.FS("readFile", "output." + inputFormat);
      const blob = new Blob([data.buffer], { type: "audio" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setShowDownload(true);
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
    link.download = "changed." + inputFormat;
    link.click();
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item md={6} sm={12} xs={12}>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#30448c",
                }}
              >
                Changing audio speed
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "200px" }}>
                <InputLabel id="dropdown-label">
                  Select a speed value
                </InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  onChange={handleDropdownChange}
                  value={selectedValue}
                >
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
            {showError && (
              <Grid
                item
                xs={12}
                color="red"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ErrorOutline size={20} />
                <Typography variant="p" marginLeft="5px">
                  {showError}
                </Typography>
              </Grid>
            )}
            {showLoading && (
              <Grid item xs={12} sx={{ color: "#30448c" }}>
                <CircularProgress color="inherit" size={30} />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h8"
                sx={{
                  fontWeight: "bold",
                  color: "#30448c",
                }}
              >
                Preview
              </Typography>
              <KeyboardArrowDown style={{ color: "#30448c" }} />
              <audio src={downloadUrl} controls />
            </Box>
            {showDownload && (
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
