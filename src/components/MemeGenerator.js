import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { createCanvas } from 'canvas';
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

const TextInput = ({ label, value, onChange }) => {
  return (
    <div className="text-input">
      <label>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

const MemeGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const canvasRef = useRef(null);

  const handleImageUpload = (image) => {
    setSelectedImage(image);
  };
  const handleGenerateMeme = () => {
    if (selectedImage) {
      const canvas = createCanvas(selectedImage.width, selectedImage.height);
      const ctx = canvas.getContext('2d');
  
      const image = new Image();
      image.src = URL.createObjectURL(selectedImage);
  
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
  
        ctx.drawImage(image, 0, 0, image.width, image.height);
  
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
  
        ctx.fillText(topText, canvas.width / 2, 40);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
  
        const memeDataURL = canvas.toDataURL('image/png');
        document.getElementById('meme-preview').src = memeDataURL;
      };
    }
  };
  

  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      <TextInput label="Top Text" value={topText} onChange={setTopText} />
      <TextInput label="Bottom Text" value={bottomText} onChange={setBottomText} />
      <button onClick={handleGenerateMeme}>Generate Meme</button>
      <div className="meme-preview">
        <img id="meme-preview" alt="Meme Preview" />
      </div>
    </div>
  );
};

export default MemeGenerator;