import React, { useState } from 'react';
import {connectJackalandUpload, connectWallet, checkFolder} from '../components/KYCinput/input';

function uploadFileToJackal() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [file, setFile] = useState(null); // Initialize file state with null

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0]; // Get the selected file from the input
    setFile(selectedFile); // Update the file state
  };

  const handleUpload = async () => {
    if (file) {
      const wallet = await connectWallet();
      await connectJackalandUpload(wallet,file); // Pass the file to your function for upload
      const folder = await checkFolder(wallet, "s/kyc");
      console.log("Folder", folder);

    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div className='mx-auto w-2/4 grid gap-6 mb-6 md:grid-cols-1 rounded-xl px-10 py-10 bg-gray-700 mt-10px'>
      <h1>Upload Identification</h1>
      <input type="file" onChange={handleFileChange} />
      <br />

      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default uploadFileToJackal;
