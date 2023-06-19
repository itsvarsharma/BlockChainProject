const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');
class Block {
    constructor({ timestamp, prev_hash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.prev_hash = prev_hash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis() {
        return new this(GENESIS_DATA)
    }
    static mineBlock({ prevBlock, data }) {
        let hash, timestamp;
        const prev_hash = prevBlock.hash;
        let { difficulty } = prevBlock;

        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock: prevBlock,
                timestamp,
            });
            hash = cryptoHash(timestamp, prev_hash, data, nonce, difficulty)
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));
        return new this({
            timestamp,
            prev_hash,
            data,
            difficulty,
            nonce,
            hash,
        });
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        if (difficulty < 1) return 1;
        const difference = timestamp - originalBlock.timestamp;
        if (difference > MINE_RATE) return difficulty - 1;
        return difficulty + 1;
    }
}

const block1 = new Block({
    hash: "0xacb",
    timestamp: "2/09/22",
    prev_hash: "0xc12",
    data: "hello"
});


// const genesisBlock=Block.genesis()
// console.log(genesisBlock);

// const result=Block.mineBlock({ prevBlock:block1, data: "block2" });
// console.log(result);

// const block2=new Block ("3/09/22","adcz8","123","hi")
console.log(block1);
// console.log(block2);
module.exports = Block;