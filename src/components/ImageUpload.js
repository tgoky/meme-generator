import React from 'react';
import { useDropzone } from 'react-dropzone';
import './Iris.css';

const ImageUpload = ({ onImageUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onImageUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="image-upload" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag & drop an image here, or click to select one</p>
    </div>
  );
};

export default ImageUpload;

