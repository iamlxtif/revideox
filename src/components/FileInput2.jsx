import React, { useState, useEffect } from 'react';
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

const FormatDropdown = styled.select`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #fff;
  color: #294189;
  border: 2px solid #294189;
  border-radius: 5px;
  cursor: pointer;
`;

const FileInput = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [formats, setFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState(null);

  useEffect(() => {
    const getFormats = async () => {
      await ffmpeg.load();
      const formats = await ffmpeg.getAvailableFormats();
      setFormats(formats.filter(format => format.format_name !== 'image2'));
    }
    getFormats();
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormats([]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormats([]);

    await ffmpeg.load();
    const formats = await ffmpeg.getAvailableFormats();
    const inputFormat = file.name.split('.').pop();
    setFormats(formats.filter(format => format.format_name !== 'image2' && format.can_demux && format.extensions.includes(inputFormat)));
  };

  const convertFile = async () => {
    if (!ffmpeg.isLoaded()) await ffmpeg.load();
    const fileExt = file.name.split('.').pop();
    const outputExt = selectedFormat.format_name.split(',').pop();
    ffmpeg.FS('writeFile', file.name, await fetchFile(file));
    await ffmpeg.run('-i', file.name, '-vf', 'format=yuv420p', `output.${outputExt}`);
    const data = ffmpeg.FS('readFile', `output.${outputExt}`);
    const convertedBlob= new Blob([data.buffer], { type:`video/${outputExt}` });
    setConvertedFile(convertedBlob);
    };
    
    const handleFormatChange = (event) => {
    const formatName = event.target.value;
    const format = formats.find(format => format.format_name === formatName);
    setSelectedFormat(format);
    };
    
    return (
    <Container>
    <DropZone onDrop={handleDrop} onDragOver={handleDragOver}>
    {imagePreview ? <PreviewImage src={imagePreview} /> : 'Drag & Drop or click to upload file'}
    </DropZone>
    {formats.length > 0 &&
    <FormatDropdown onChange={handleFormatChange}>
    <option value="">Choose format</option>
    {formats.map(format =>
    <option key={format.format_name} value={format.format_name}>{format.format_name}</option>
    )}
    </FormatDropdown>
    }
    {selectedFormat &&
    <DownloadButton onClick={convertFile}>Download {selectedFormat.format_name} file</DownloadButton>
    }
    {convertedFile &&
    <a href={URL.createObjectURL(convertedFile)} download={`converted.${selectedFormat.format_name}`}>Download Converted File</a>
    }
    <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
    </Container>
    );
    };
    
    export default FileInput;