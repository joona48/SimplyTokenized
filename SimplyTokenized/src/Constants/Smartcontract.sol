// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PublicToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mintTo(address receiver, uint256 amount) public {
        _mint(receiver, amount);
    }
}
