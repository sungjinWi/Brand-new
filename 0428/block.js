// blockchain 관련 function
// block 구조 설계
/*
    index : 블록체인의 높이
    data : 블록에 포함된 모든 데이터 (트랜잭션 포함)
    timestamp : 블록이 생성된 시간
    hash : 블록 내부 데이터로 생성한 sha256 값 (블록의 유일성)
    previousHash : 이전 블록의 해쉬 (이전 블록 참조)
*/

import CryptoJS from "crypto-js"

class Block {
    constructor(index, data, timestamp, hash, previousHash) {
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.hash = hash;
        this.previousHash = previousHash;
    }
}


const getBlocks = () => { // 외부에 노출할 수 있게
    return blocks;
}

const calculateHash = (index, data, timestamp, previousHash) => {
    return CryptoJS.SHA256(`${index + data + timestamp + previousHash}`).toString(); // toString() 한 것이 우리가 원하는 형태
}


const createGenesisBlock = () => {
    const genesisBlock = new Block(0, 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks',new Date().getTime() / 1000, 0, 0);
    
    genesisBlock.hash = calculateHash(genesisBlock.index, genesisBlock.data, 
    genesisBlock.timestamp, genesisBlock.previousHash);
    return genesisBlock;
}

const createBlock = (blockData) => {
    const previousBlock = blocks[blocks.length - 1];
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = calculateHash(nextIndex, blockData ,nextTimestamp, previousBlock.hash);
    const newBlock = new Block(nextIndex, blockData, nextTimestamp, nextHash, previousBlock.hash);
    if(isValidNewBlock(newBlock,previousBlock)){
        blocks.push(newBlock)
        return newBlock;
    }
    
    console.log("fail to create newblock");
    return null;
}

//블록의 무결성 검증
/*
    블록의 인덱스가 이전 블록 인덱스보다 1크다
    블록의 previousHash가 이전 블록의 hash이다
    블록의 구조가 일치해야 한다.
*/

const isValidBlockStructure = (newBlock) => {
    return(
        typeof (newBlock.index) === "number"
        && typeof (newBlock.data) === "string"
        && typeof (newBlock.timestamp) === "number"
        && typeof (newBlock.hash) === "string"
        && typeof (newBlock.previousHash) === "string"
    )
    
}

const isValidNewBlock = (newBlock, previousBlock) => {
    if (newBlock.index !== previousBlock.index + 1) {
        console.log("invalid index");
        return false;
    }
    else if (newBlock.previousHash !== previousBlock.hash) {
        console.log("invalid previous hash");
        return false;
    }
    else if (!isValidBlockStructure(newBlock)) {
        console.log("invalid block structure");
        return false;
    }
    return true;
}

const blocks = [createGenesisBlock()];



export { getBlocks , createBlock, blocks };