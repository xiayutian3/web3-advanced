// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


//继承openzepplin erc 20
contract AxsToken is ERC20("Axs token","AXS"), Ownable  {

    //调用父类函数铸造代币
    function mint(address account, uint256 amount) public  onlyOwner {
        _mint(account, amount);
    }

}