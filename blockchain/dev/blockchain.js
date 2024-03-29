const sha256 = require('sha256');
const currentNodeUrl = process.argv[3]; // grabs url from position 3 index 2
const { v1: uuidv1 } = require('uuid'); 

// constructor function
function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];
    this.transaction = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = []; // allows each network to be aware of the other nodes

    // Create the Genesis Block
    this.createNewBlock(100, '0', '0');
};




// create new block method 
// will validate the new block
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    // create new block object
    const newBlock = {
        index: this.chain.length + 1, // gets the block number
        timestamp: Date.now(), // gets the date
        transactions: this.pendingTransactions, // gets all pending transactions
        nonce: nonce, // number with the POW method that proves legitimacy
        hash: hash, // the data from the current block...gets compressed into a single string
        previousBlockHash: previousBlockHash // data from previous block
    };

    this.pendingTransactions = []; // clears out this array to start over for the next block
    this.chain.push(newBlock); // pushes data to the chain

    return newBlock;
}

// add prototype to get last block
Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}



// refactored into two methods
Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: uuidv1().split('-').join('') // splits it at each dash and rejoins it with an empty string
    };

    return newTransaction;
}

// SIGNING THE TRANSACTION
// class Transaction {
//     // validate signature
//     //will return the 256hash
//     calculateHash() {
//         return sha256(this.sender + this.recipient + this.amount).toString();
//     };

//     signTransaction(signingKey) {

//         if(signingKey.getPublic('hex') !== this.fromAddress) {
//             throw newError('You cannot sign transactions for other wallets!');

//         }
//         const hashTX = this.calculateHash();
//         const sig = signingKey.sign(hashTx, 'base64');
//         this.signature = sig.toDER('hex');
//     }

//     isValid(){
//         if(this.sender === null) return true;

//         if(!this.signature || this.signature.length === 0) {
//             throw new Error('No signature in this transaction');
//         }

//         const publicKey = ec.keyFromPublic(this.sender, 'hex');
//         return publicKey.verify(this.calculateHash(), this.signature);
//     }

// }   

    

    //push into newTransaction into pendingTransactions array
    // this.pendingTransactions.push(newTransaction);

    // return the # of the block that this transaction will be added to
    // return this.getLastBlock()['index'] + 1;


Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()['index'] + 1;
}

// Use SHA256. Need to install.
// Takes in block data and hashes the string. Pass data of a block into the method and will return hash
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    // need to turn data into a string
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    // create hash
    const hash = sha256(dataAsString);
    return hash;
}

// Add proof of work method
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    let nonce = 0;
    // need to run until the 1st 4 characters are '0000'.
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;
}

// Will validate other chains in the network when compared to the chain on the current node
Blockchain.prototype.chainIsValid = function(blockchain) {
	let validChain = true;

	for (var i = 1; i < blockchain.length; i++) {
		const currentBlock = blockchain[i];
		const prevBlock = blockchain[i - 1];
		const blockHash = this.hashBlock(prevBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);
		if (blockHash.substring(0, 4) !== '0000') validChain = false;
		if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;

        // console.log('previousBlockHash =>', prevBlock['hash']);
        // console.log('currentBlockHash =>', currentBlock['hash']);
	};

	const genesisBlock = blockchain[0];
	const correctNonce = genesisBlock['nonce'] === 100;
	const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
	const correctHash = genesisBlock['hash'] === '0';
	const correctTransactions = genesisBlock['transactions'].length === 0;

	if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

	return validChain;
};

Blockchain.prototype.getBlock = function(blockHash) {
    let correctBlock = null;
    this.chain.forEach(block => {
        if (block.hash === blockHash) correctBlock = block;
    });
    return correctBlock;
};


Blockchain.prototype.getTransaction = function(transactionId) {
    let correctTransaction = null;
    let correctBlock = null;
    this.chain.forEach(block => {
        block.transactions.forEach(transaction => {
            if (transaction.transactionId === transactionId) {
                correctTransaction = transaction;
                correctBlock = block;
            };
        });
        
    });
    return {
        transaction: correctTransaction,
        block: correctBlock
    };
};


Blockchain.prototype.getAddressData = function(address) {
    const addressTransactions = [];
    this.chain.forEach(block => {
        block.transactions.forEach(transaction => {
            if(transaction.sender === address || transaction.recipient === address) {
                addressTransactions.push(transaction);
            };
        });
    });

    let balance = 0;
    addressTransactions.forEach(transaction => {
        if(transaction.recipient === address) balance += transaction.amount;
        else if (transaction.sender === address) balance  -= transaction.amount;
    });

    return {
        addressTransactions: addressTransactions,
        addressBalance: balance
    };
};



module.exports = Blockchain;
