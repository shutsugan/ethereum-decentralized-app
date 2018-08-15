const Election = artifacts.require('./Election.sol');

contract("Election", accounts => {
    console.log('==>', accounts);

    let electionInstance;

    it ("Initializes with two candidates", () => {
        return Election
            .deployed()
            .then(instance => instance.candidatesCount())
            .then(count => assert.equal(count, 2));
    });

    it("It initializes the candidates with the correct values", () => {
        return Election
            .deployed()
            .then(instance => {
                electionInstance = instance;
                return electionInstance.candidates(1);
            })
            .then(candidate => {
                assert.equal(candidate[0], 1, "contains the correct id");
                assert.equal(candidate[1], "Candidate 1", "contains the correct name");
                assert.equal(candidate[2], 0, "contains the correct votes count");

                return electionInstance.candidates(2);
            })
            .then(candidate => {
                assert.equal(candidate[0], 2, "contains the correct id");
                assert.equal(candidate[1], "Candidate 2", "contains the correct name");
                assert.equal(candidate[2], 0, "contains the correct votes count");
            });
    });

    it("Allows a voter to cast a vote", () => {
        return Election
            .deployed()
            .then(instance => {
                electionInstance = instance;
                candidateId = 1;

                return electionInstance.vote(
                    candidateId, 
                    {from: accounts[0]}
                );
            })
            .then(receipt => {
                console.log(receipt);
                return electionInstance
                    .voters(accounts[0]);
            })
            .then(voted => {
                assert(voted, "the voter was marked as voted");
                return electionInstance.candidates(candidateId);
            })
            .then(candidate => {
                const voteCount = candidate[2];
                assert.equal(voteCount, 1, "increments the candidate's vote count");
            });
    });

    it("Throws an exception for invalid candidates", () => {
        return Election
            .deployed()
            .then(instance => {
                electionInstance = instance;
                return electionInstance.vote(99, {from: accounts[1]});
            })
            .then(assert.fail)
            .catch(err => {
                assert(err.message.indexOf('revert') >= 0, "error must contain revert");
                return electionInstance.candidates(1);
            })
            .then(candidate1 => {
                const voteCount = candidate1[2];
                assert.equal(voteCount, 1, "candidate 1 did not receive any votes");

                return electionInstance.candidates(2);
            })
            .then(candidate2 => {
                const voteCount = candidate2[2];
                assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
            });
    });

    it("Throw an exception for double voting", () => {
        return Election
            .deployed()
            .then(instance => {
                electionInstance = instance;
                candidateId = 2;

                electionInstance.vote(
                    candidateId,
                    {from: accounts[1]}
                );

                return electionInstance.candidates(candidateId);
            })
            .then(candidate => {
                const voteCount = candidate[2];
                assert.equal(voteCount, 1, "accepts first vote");

                //vote again
                return electionInstance.vote(
                    candidateId,
                    {from: accounts[1]}
                );
            })
            .then(assert.fail)
            .catch(err => {
                assert(err.message.indexOf('revert') >= 0, "error must contain revert");
                return electionInstance.candidates(1);
            })
            .then(candidate1 => {
                const voteCount = candidate1[2];
                assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
                
                return electionInstance.candidates(2);
            })
            .then(candidate2 => {
                const voteCount = candidate2[2];
                assert.equal(voteCount, 1, "candidate 2 did not receive any votes")
            });
    });
});