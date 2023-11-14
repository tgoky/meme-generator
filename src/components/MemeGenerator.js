import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Accessories from './Accessory';

const ProfilePictureEditor = () => {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p style={{color: 'white'}}>Drag 'n' drop your image here, or click to select a file</p>
      </div>

      {image && (
        <div style={imageContainerStyle}>
          <img src={image} alt="Uploaded" style={imageStyle} />
        </div>
      )}

      {image && (
        <div style={accessoryContainerStyle}>

          <Accessories image={image} />
          </div>

      )}
    </div>
  );
};

const dropzoneStyle = {
  width: '300px',
  height: '200px', // Set a specific height for the dropzone
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const imageContainerStyle = {
  marginTop: '20px', // Add space between dropzone and image
  position: 'relative',
};

const imageStyle = {
  width: '100%', // Ensure the image covers the entire container
  height: '100%',
  borderRadius: '4px',
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const accessoryContainerStyle = {
  marginTop: '-990px',
  marginLeft: '-1190px',
  width: '200px',
  height: '170px',
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',

// Add space between image and accessory

};

export default ProfilePictureEditor;
