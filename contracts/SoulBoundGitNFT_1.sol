// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SoulBoundGitNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private s_tokenIdCounter;

    //Mapping of tokenToGithubURL and GithubURL to Token
    mapping(uint256 => string) public tokenToGithub;
    mapping(string => uint256) public githubToToken;


    constructor() ERC721("SoulBoundGitNFT", "SBGNFT") {
        //increment token id so token ids start at 1
        s_tokenIdCounter.increment();
    }

    function generateOnChainImage(uint256 _tokenId) public view returns (string memory){
        //caching
        string memory m_github_username = tokenToGithub[_tokenId];
        string memory m_address_as_string = Strings.toHexString(uint256(uint160(getAddressByGithub(m_github_username))), 20);
        //Edit the text area of the svg to edit the text shown on the nft
        bytes memory svg = abi.encodePacked('<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
        '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
        '<rect width="100%" height="100%" fill="black" />',
        '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',"Github Username : ", m_github_username, '</text>',
        '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">', m_address_as_string,'</text>',
        '</svg>'
        );

        return string(
        abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(svg) //From Openzepplin. Used to convert to string
        )    
    );
    }

    //Will need URI later - will not be pure later
    function getTokenURI(uint256 _tokenId) public view returns(string memory){
        bytes memory dataURI = abi.encodePacked(
            '{',
            '"name": "TrustLink NFT",',
            '"description": "TrustLink is a way to link your on chain web3 reputation to your github web2 reputation.",',
            '"image": "', generateOnChainImage(_tokenId), '"',
        '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
        }



    function safeMint(string memory githubUsername) public{
        uint256 tokenId = s_tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        s_tokenIdCounter.increment();
        githubToToken[githubUsername] = tokenId;
        tokenToGithub[tokenId] = githubUsername;
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }

    function getAddressByGithub(string memory _githubUsername) public view returns(address){
        uint256 m_tokenid = githubToToken[_githubUsername];
        //require token exists
        require(_exists(m_tokenid), "Error : This token does not exist");
        return ownerOf(m_tokenid);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

    //ERC721 BeforeTransfer and AfterTransfer functions act as hooks for things that happen before and after transfers
     
    //Override ERC721 _beforeTokenTransfer function so that these nfts cannot be transferred 
    function _beforeTokenTransfer(address from, address to, uint256 /*firstTokenId*/, uint256 /*batchSize*/) internal override virtual {
        //If user is buring the token or recieving the token let it go through. Else don't allow
        require(from == address(0) || to == address(0), "You Cannot Transfer this token");

    }
    //emit event Transfer if we burn or mint
     function _afterTokenTransfer(address from, address to, uint256 firstTokenId, uint256 /*batchSize*/) internal override virtual {
        if(from == address(0) || to == address(0)){
            emit Transfer(from, to, firstTokenId);
        }
     }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only the Owner of the token may burn it");
        _burn(tokenId);
    }
}