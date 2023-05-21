import React, { useState } from 'react';
import { connectJackalandUpload, connectWallet, checkFolder } from '../components/KYCinput/input';
import {toast} from 'react-toastify';

function uploadFileToJackal() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [file, setFile] = useState(null); // Initialize file state with null

  // const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0]; // Get the selected file from the input
    setFile(selectedFile); // Update the file state
  };

  const handleUpload = async () => {
    if (file) {
      const wallet = await connectWallet();
      await connectJackalandUpload(wallet, file); // Pass the file to your function for upload
      const folder = await checkFolder(wallet, "s/kyc");
      if (folder !== null) {
        toast.success("Identification uploaded successfully");
      }else {
        toast.error("Identification upload failed");
      }

    } else {
      console.error('No file selected.'); 
    }
  };

  return (
    <div className='grid gap-6 mb-6 md:grid-cols-1 rounded-xl px-10 py-10 bg-gray-700 mt-10px'>
      <h1 className="text-3xl text-white font-bold text-center">Upload Identification</h1>

<div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${
          file ? "bg-gray-100 dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {file ? (
              // add the file name
              <>
              <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              	<path d="M191.344,20.922l-95.155,95.155c-0.756,0.756-1.297,1.699-1.565,2.734l-8.167,31.454c-0.534,2.059,0.061,4.246,1.565,5.751
		c1.14,1.139,2.671,1.757,4.242,1.757c0.503,0,1.009-0.063,1.508-0.192l31.454-8.168c1.035-0.269,1.979-0.81,2.734-1.565
		l95.153-95.153c0.002-0.002,0.004-0.003,0.005-0.004s0.003-0.004,0.004-0.005l19.156-19.156c2.344-2.343,2.344-6.142,0.001-8.484
		L218.994,1.758C217.868,0.632,216.343,0,214.751,0c-1.591,0-3.117,0.632-4.242,1.758l-19.155,19.155
		c-0.002,0.002-0.004,0.003-0.005,0.004S191.346,20.921,191.344,20.922z M120.631,138.208l-19.993,5.192l5.191-19.993l89.762-89.762
		l14.801,14.802L120.631,138.208z M214.751,14.485l14.801,14.802l-10.675,10.675L204.076,25.16L214.751,14.485z"/>
	<path d="M238.037,65.022c-3.313,0-6,2.687-6,6v192.813H43.799V34.417h111.063c3.313,0,6-2.687,6-6s-2.687-6-6-6H37.799
		c-3.313,0-6,2.687-6,6v241.419c0,3.313,2.687,6,6,6h200.238c3.313,0,6-2.687,6-6V71.022
		C244.037,67.709,241.351,65.022,238.037,65.022z"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {file.name}
            </p>
            </>


          ) : (
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
          )}
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">
              {file ? "File selected" : "Click to upload"}
            </span>{" "}
            or drag and drop
          </p>
          {/* <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF
          </p> */}
        </div>
        <input
          id="dropzone-file"
          onChange={handleFileChange}
          type="file"
          className="hidden"
        />
      </label>
    </div>

      <button className='text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default uploadFileToJackal;