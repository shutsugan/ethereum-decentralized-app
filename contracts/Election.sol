pragma solidity ^0.4.0;

contract Election {
    //Read/write candidate
    string public candidate;

    //Constructor
    constructor() {
        candidate = "Candidate 1";
    }
}