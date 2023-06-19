const {GENESIS_DATA}=require('./config');
const cryptoHash=require('./crypto-hash');
class Block{
    constructor({timestamp,prev_hash,hash,data}){
        this.timestamp=timestamp;
        this.prev_hash=prev_hash;
        this.hash=hash;
        this.data=data;
    }
    static genesis(){
        return new this(GENESIS_DATA)
    }
    static mineBlock({prevBlock,data}){

        let hash,timestamp;
        const prev_hash = prevBlock.hash;
        return new this({
           timestamp,
           prev_hash,
           data,
           hash: cryptoHash(timestamp,prev_hash,data) 
        });
    }
}
const block1=new Block({
    hash:"0xacb",
    timestamp:"2/09/22",
    prev_hash:"0xc12",
    data:"hello"
});

const genesisBlock=Block.genesis()
// console.log(genesisBlock);

// const result=Block.mineBlock({ prevBlock:block1, data: "block2" });
// console.log(result);

// const block2=new Block ("3/09/22","adcz8","123","hi")
// console.log(block1);
// console.log(block2);
module.exports=Block;