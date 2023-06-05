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

const Rotate = () => {
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
    const isVideo = file.type.includes("video");
    if (!isVideo) {
      setShowError("Please upload an video file !");
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
    if (!showError.includes("upload")) {
      setShowError("");
    }
  };

  const handleRotate = () => {
    // Check if all inputs are selected
    if (!selectedFile || !selectedValue) {
      if (!showError.includes("upload")) {
        setShowError("Please ensure that all fields are filled");
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
        "input." + inputFormat,
        "-vf",
        "transpose=" + selectedValue,
        "output." + inputFormat
      );

      // Get the trimmed video as a Blob and create a download link for it
      const data = ffmpeg.FS("readFile", "output." + inputFormat);
      const blob = new Blob([data.buffer], { type: "video" });
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
    link.download = "rotated." + inputFormat;
    link.click();
  };

  return (
    <Container maxWidth="md" sx={{ padding: '100px 20px' }}>
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
                Rotating video
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "200px" }}>
                <InputLabel id="dropdown-label">
                  Select your option
                </InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  onChange={handleDropdownChange}
                  value={selectedValue}
                >
                  <MenuItem value="0">Rotate by 90 degrees counterclockwise and flip vertically</MenuItem>
                  <MenuItem value="1">Rotate by 90 degrees clockwise</MenuItem>
                  <MenuItem value="2">Rotate by 90 degrees counterclockwise</MenuItem>
                  <MenuItem value="3">Rotate by 90 degrees clockwise and flip vertically</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleRotate}
                sx={{
                  backgroundColor: "#30448c",
                  color: "white",
                }}
              >
                Rotate
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
              <video
                src={downloadUrl}
                controls
                style={{ width: "100%", height: "100%" }}
              />
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

export default Rotate;
