pragma solidity ^0.4.24;

contract Election {
    //Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    //Store accounts that have voted
    mapping(address => bool) public voters;

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

    function vote(uint _candidateId) public {
        //haven't voted before
        require(!voters[msg.sender]);

        //valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        //record that voter has voted
        voters[msg.sender] = true;

        //update candidate vote count
        candidates[_candidateId].voteCount++;
    }
}