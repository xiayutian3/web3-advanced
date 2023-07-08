// SPDX-License-Identifier: GPL-3.0

// 使用openzepplin库发布无聊猿NFT

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//继承openzepplin erc721
contract ApeNFT is ERC721("Ape NFT", "APE"), Ownable {
    // 总数，和最大数量
    uint256 public totalSupply;
    uint256 public maxSupply = 10000;

    // 设置基本路径
    string private baseURL;

    //免费铸造 ，调用父类safemint函数
    function freemint() public {
        require(totalSupply + 1 <maxSupply);
        totalSupply++;
        _safeMint(msg.sender, totalSupply); //totalSupply用作自增id
    }
    //免费铸造 ,最多制造5张
    function freemint(uint num) public {
        require(totalSupply + num <maxSupply);
        require(num <= 5,"only mint number of 5 nft");
        for (uint i=0; i<num; i++){
            totalSupply++;
            _safeMint(msg.sender, totalSupply);
        }
    }


    // 修改基本路径
    function setBaseURL(string memory _baseURL) public onlyOwner {
        baseURL = _baseURL;
    }

    // 重写父类的 _baseURI 函数 ，设置基本路径，比如 https
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURL;
    }



}
