// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable{

    uint256 public constant maxTotalSupply = 1000000 *10**18;

    constructor() ERC20("Test Token","TSTK"){
        _mint(msg.sender, maxTotalSupply);
    }

    function mint(uint256 amount) public payable{
        _mint(msg.sender, amount);
    }
}