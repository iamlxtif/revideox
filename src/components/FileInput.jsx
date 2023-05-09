import React, { useState } from 'react';
import styled from 'styled-components';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const DropZone = styled.div`
  border: 2px dashed #ccc;
  border-radius: 10px;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const DownloadButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #294189;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FileInput = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const convertToJpeg = async () => {
    if (!ffmpeg.isLoaded()) await ffmpeg.load();

    ffmpeg.FS('writeFile', file.name, await fetchFile(file));
    await ffmpeg.run('-i', file.name, '-vf', 'format=yuv420p', 'output.jpg');
    const data = ffmpeg.FS('readFile', 'output.jpg');

    const convertedBlob = new Blob([data.buffer], { type: 'image/jpeg' });
    const convertedFile = new File([convertedBlob], 'output.jpg', { type: 'image/jpeg' });
    setConvertedFile(convertedFile);
  };

  const handleDownload = () => {
    const downloadUrl = URL.createObjectURL(convertedFile);
    const link = document.createElement('a');
    link.download = convertedFile.name;
    link.href = downloadUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      {convertedFile ? (
        <>
          <PreviewImage src={URL.createObjectURL(convertedFile)} alt="Converted file preview" />
          <DownloadButton onClick={handleDownload}>Download</DownloadButton>
        </>
      ) : (
        <>
          <DropZone onDrop={handleDrop} onDragOver={handleDragOver}>
            <input type="file" accept="image/png" onChange={handleFileChange} />
            {imagePreview && <PreviewImage src={imagePreview} alt="File preview" />}
            {!file && <div>Drag and drop a PNG file or click to browse</div>}
          </DropZone>
          {file && (
            <DownloadButton onClick={convertToJpeg}>Convert to JPEG</DownloadButton>
          )}
        </>
      )}
    </Container>
  );
};

export default FileInput
