import CryptoJS from "crypto-js"

const COINBASE_AMOUNT = 50;

// 코인을 어디로 얼만큼 보냈는가
class TxOut {
    constructor(address, amount) {
        this.address = address; // string
        this.amount = amount; // number
        
    }
}

// 보내진 코인을 보낸 사람이 실제로 소유했는가에 대한 증거
class TxIn {
    constructor(txOutId, txOutIndex, sign){
        this.txOutId = txOutId; // string
        this.txOutIndex = txOutIndex; // number
        this.sign = sign; // string
    }
}


class Transaction {
    constructor(id, txIns, txOuts) {
        this.id = id; // string
        this.txIns = txIns; // TxIn []
        this.txOuts = txOuts; // TxOut []
    }
}

// transaction id
// 트랜잭션 자체가 변조되지않았다를 검증
const getTransactionId = (transaction) => {

    // txIns에 있는 내용들을 하나의 문자열로 만든다.
    const txInsContent = transaction.txIns.map((txIn)=>{
        (txIn.txOutId + txIn.txOutIndex)
    }).reduce((a,b) => {
        a + b, ""
    })

    // txOuts에 있는 내용들을 하나의 문자열로 만든다.
    const txOutsContent = transaction.txOuts
    .map((txOut)=>txOut.address + txOut.amount)
    .reduce((a,b) => a + b, "")


    // 위의 두 내용을 다 합해서 hash처리한다.
    return CryptoJS.SHA256(txInsContent + txOutsContent).toString();
}

// transaction signature
// 누가 보냈는지, 보낸사람이 확실하다를 검증
const signTxIn = (transaction, txInIndex, privateKey) => {
    // const txIn = transaction.txIns[txInIndex]; // 나중에


    // TODO : sign 코드 검증
    const signature = toHexString(privateKey, transaction.id).toDER();
    return signature;
}

// coinbase Transaction
const getCoinbaseTransaction = (address, blockindex) => {
    const tr = new Transaction();

    const txIn = new TxIn();
    txIn.sign = "";
    txIn.txOutId = "";
    txIn.txOutIndex = blockindex;


    const txOut = new TxOut();
    txOut.address = address;
    txOut.amount = COINBASE_AMOUNT;


    tr.txIns = [txIn];
    tr.txOuts = [txOut];
    tr.id = getTransactionId(tr);

    return tr;
}