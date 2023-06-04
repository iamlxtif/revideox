import React, { useState, useEffect } from "react";
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
import { ErrorOutline, KeyboardArrowDown } from "@mui/icons-material";

const Merge = (props) => {
  const { fileType } = props;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showError, setShowError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFiles([]);
    setDownloadUrl("");
    setShowError("");
    const files = Array.from(event.target.files);
    for (const file of files) {
      const isAudio = file.type.includes("audio");
      const isVideo = file.type.includes("video");
      if (fileType == "video" && !isVideo) {
        setShowError("Please upload video files");
        return;
      } else if (fileType == "audio" && !isAudio) {
        setShowError("Please upload audio files");
        return;
      }
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setShowDownload(false);
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      if (!showError.includes("Please")) {
        setShowError("You have to upload 2 files at least to merge them");
      }
      return;
    }
    setShowLoading(true);
    let inputFormat = "";
    let i = 1;
    for (const selectedFile of selectedFiles) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);

      reader.onload = async (event) => {
        const { result } = event.target;
        const inputFileName = selectedFile.name;
        inputFormat = inputFileName.substring(
          inputFileName.lastIndexOf(".") + 1
        );

        ffmpeg.FS("writeFile", "input." + inputFormat, new Uint8Array(result));
      };
      i++;
      await new Promise((resolve) => {
        reader.onloadend = resolve;
      });
    }
    i = 0;
    const mergeCommands = selectedFiles.map((selectedFile, index) => {
      const inputFileName = selectedFile.name;
      inputFormat = inputFileName.substring(inputFileName.lastIndexOf(".") + 1);
      i++;
      console.log(i);
      return ["-i", "input." + inputFormat];
    });
    console.log(mergeCommands);
    const mergeOutput = mergeCommands.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );
    console.log(mergeOutput);
    await ffmpeg.run(
      ...mergeOutput,
      "-filter_complex",
      `concat=n=${selectedFiles.length}:v=1:a=1`,
      "output." + inputFormat
    );

    // Clean up temporary files
    const data = ffmpeg.FS("readFile", "output." + inputFormat);
    let blob = undefined;
    if (fileType == "video") {
      blob = new Blob([data.buffer], { type: "video" });
    } else {
      blob = new Blob([data.buffer], { type: "audio" });
    }
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setShowLoading(false);
    setShowDownload(true);

    // Clean up temporary files
    ffmpeg.FS("unlink", "input." + inputFormat);
    ffmpeg.FS("unlink", "output." + inputFormat);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    if (fileType == "video") {
      link.download = "Merged.mp4";
    } else {
      link.download = "Merged.mp3";
    }
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
                Merging
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                inputProps={{ multiple: true }}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12}>
              {(fileType == "video" && (
                <Button
                  variant="contained"
                  onClick={handleMerge}
                  sx={{
                    backgroundColor: "#30448c",
                    color: "white",
                  }}
                >
                  Merge Video
                </Button>
              )) || (
                <Button
                  variant="contained"
                  onClick={handleMerge}
                  sx={{
                    backgroundColor: "#30448c",
                    color: "white",
                  }}
                >
                  Merge Audio
                </Button>
              )}
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
          <Grid item xs={12}>
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
              {(fileType == "video" && (
                <video
                  src={downloadUrl}
                  controls
                  style={{ width: "100%", height: "100%" }}
                />
              )) ||
                (fileType == "audio" && <audio src={downloadUrl} controls />)}
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

export default Merge;
