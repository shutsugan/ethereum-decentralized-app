pragma solidity ^0.4.0;

contract Election {
    //Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //Read/write candidate
    mapping(uint => Candidate) public candidates;

    //Store CandidatesCount;
    uint public candidatesCount;

    //Constructor
    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            _name,
            0
        );
    }
}