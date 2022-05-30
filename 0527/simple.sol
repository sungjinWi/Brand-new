// SPDX-License-Identifier: MIT
pragma solidity >=0.4.11;
contract Simple{
    uint256 data;
    function getData() public view returns(uint256) {
    return data;
}
function setData (uint256 _data) public{
    data= _data;
}
} 