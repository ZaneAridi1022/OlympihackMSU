import React, { useEffect, useState } from "react";

async function NFTDisplay({ contract, tokenId }){
  const [tokenURI, setTokenURI] = useState("");

  useEffect(() => {
    const fetchTokenURI = async () => {
      const uri = await contract.methods.getTokenURI(tokenId).call();
      console.log("URIII",uri);
      setTokenURI(uri);
    };

        fetchTokenURI();
    }, [contract, tokenId]);


  return tokenURI;
}

export default NFTDisplay;