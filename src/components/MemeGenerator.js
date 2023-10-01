
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createCanvas } from 'canvas';
import './Iris.css';

import overlayImage1 from '../overlays/hotdog.png';
import overlayImage2 from '../overlays/hotdog2.png';
import overlayImage3 from '../overlays/hotdog3.png';


const ImageUpload = ({ onImageUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onImageUpload(acceptedFiles[0]);
      }
    },
  });
 

  //clean up
  // roll up
  //initialize
  //delete
  return (
    <div className="image-upload-container" {...getRootProps()}>
    <div className="image-upload">
      <div className="image-upload-border">
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>
    </div>
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
  const overlayImages = [overlayImage1, overlayImage2, overlayImage3];

  const handleImageUpload = (image) => {
    setSelectedImage(image);
  };

  const handleOverlayImageDrop = (event, overlayIndex) => {
    event.preventDefault();
    // Handle the drop of overlay image at the specified index
  };

  
  const handleGenerateMeme = () => {
    if (selectedImage) {
      const canvas = createCanvas(selectedImage.width, selectedImage.height);
      const ctx = canvas.getContext('2d');
    
      const image = new Image();
      image.src = URL.createObjectURL(selectedImage);
    
      image.onload = () => {
        // Define the maximum width and height for the resized image
        const maxWidth = 600;
        const maxHeight = 600;
        
        // Calculate the new dimensions while maintaining the aspect ratio
        let newWidth = image.width;
        let newHeight = image.height;
        if (newWidth > maxWidth) {
          newWidth = maxWidth;
          newHeight = (image.height * maxWidth) / image.width;
        }
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = (image.width * maxHeight) / image.height;
        }
  
        canvas.width = newWidth;
        canvas.height = newHeight;
  
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
    
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

  const handleGenerateMemeWithOverlay = () => {
    if (selectedImage) {
      const canvas = createCanvas(selectedImage.width, selectedImage.height);
      const ctx = canvas.getContext('2d');

      // Load uploaded base image
      const baseImage = new Image();
      baseImage.src = URL.createObjectURL(selectedImage);

      baseImage.onload = () => {
        // Apply overlay images on canvas
        // Apply text and generate meme
      };
    }
  };
  
  

  return (
    <div className="meme-generator">
       <div className="overlay-images">
        {overlayImages.map((overlayImage, index) => (
          <img
            key={index}
            src={overlayImage}
            width="80px"
            height="80px"
            alt={`Overlay ${index}`}
            draggable="true"
            onDragStart={(event) => event.dataTransfer.setData('text/plain', index)}
          />
        ))}
      </div>
      {/* ... Other components ... */}
      <button onClick={handleGenerateMemeWithOverlay}>Generate Meme with Overlay</button>
      <div className="meme-preview">
        {/* Display combined meme image with overlay */}
      </div>
      <h1 style={{color: 'white'}}>GLIZZY OVERDRIVE</h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      <TextInput label="Top Text" value={topText} onChange={setTopText} />
      <TextInput label="Bottom Text" value={bottomText} onChange={setBottomText} />
      <button onClick={handleGenerateMeme}>Generate Meme</button>
      <div className="meme-preview">
        <img id="meme-preview" alt="Meme Preview" style={{ width: 600, height: 480,}}/>
      </div>
    </div>
  );
};

export default MemeGenerator;


