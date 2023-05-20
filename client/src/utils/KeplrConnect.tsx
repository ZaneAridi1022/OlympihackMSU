import { useState } from 'react';
import {connectJackalandUpload} from '../../components/KYCinput/input';

function uploadFileToJackal() {
  const [file, setFile] = useState(null); // Initialize file state with null

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0]; // Get the selected file from the input
    setFile(selectedFile); // Update the file state
  };

  const handleUpload = () => {
    if (file) {
      connectJackalandUpload(file); // Pass the file to your function for upload
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default uploadFileToJackal;
