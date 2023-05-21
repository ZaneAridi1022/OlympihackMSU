import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode } ) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [githubName, setGithub] = useState("");
  const [chainData, setChainData] = useState({} as any);
  return (
    <>
    <AuthContext.Provider value={{ walletAddress, setWalletAddress, githubName, setGithub, chainData, setChainData }}>
      {children}
    </AuthContext.Provider>
    </>
  );
};