// peer to peer
// 다른 노드와 통신을 위한 서버

import WebSocket from "ws";
// import random from "random";
import { WebSocketServer } from "ws";
import { getBlocks, getLatestBlock, addBlock ,createBlock , isValidNewBlock } from "./block.js"

const MessageType = {
    // RESPONSE_MESSAGE : 0,
    // SENT_MESSAGE : 1

    // 최신 블록 요청
    QUERY_LATEST : 0,

    // 모든 블록 요청
    QUERY_ALL : 1,

    // 블록 전달
    RESPONSE_BLOCKCHAIN: 2
}

const sockets = []; //배열 시작점의 주소를 sockets에 저장


// 응답을 받는 서버의 역할
const initP2PServer = (p2pPort) => {
    const server = new WebSocketServer({port:p2pPort});
    server.on("connection", (ws) => {
        console.log("someone ws connected to me")
        initConnection(ws); // 추가 안하면 message handle 못함
    })
    
    
    console.log("listening P2PServer Port : ", p2pPort)
}

const initConnection = (ws) => {
    sockets.push(ws);
    initMessageHandler(ws);

    write(ws, queryAllMessage()); // 연결될 때 
}

const connectionToPeer = (newPeer) => {
    const ws = new WebSocket(newPeer);
    ws.on("open", () => {
        initConnection(ws);
        console.log("Connect peer : ", newPeer);
    })
    ws.on("error", () => {console.log("Fail to Connection peer : ", newPeer);})
}

const initMessageHandler = (ws) => {
    ws.on("message", (data) => {
        const message = JSON.parse(data);
        switch(message.type)
        {
            // case MessageType.SENT_MESSAGE : // 메시지 보냈을 때
            //     // console.log(ws._socket.remoteAddress, " : ", message.message) // ????????????????????
            //     console.log(ws._socket);
            //     receivedMsg = message.message;
            case MessageType.QUERY_LATEST:
                console.log("reply latest")
                break;
            case MessageType.QUERY_ALL:
                write(ws, responseAllMessage())
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:
                console.log(ws._socket.remoteAddress, " : ", message.data) 
                // handleBlockchainResponse(message);
                replaceBlockchain(message.data);
                break;
        }
    })
}

const isValidBlockchain = (receiveBlockchain) => {
    // 같은 제네시스 블록인가
    if (JSON.stringify(receiveBlockchain[0]) !== JSON.stringify(getBlocks()[0])) 
        return false;
    
    // 체인 내의 모든 블록을 확인
    for (let i = 1; i < receiveBlockchain.length; i++) 
    {
        if (isValidNewBlock(receiveBlockchain[i],receiveBlockchain[i-1]) == false)
            return false;
        
    }

    return true;
}

const replaceBlockchain = (receiveBlockchain) => {
    if(isValidBlockchain(receiveBlockchain))
    {
        let blocks = getBlocks();
        if(receiveBlockchain.length > blocks.length)
        {
            console.log("받은 블록체인 길이가 길다")
            blocks = receiveBlockchain;
        }
        else if (receiveBlockchain.length == blocks.length && random.boolean()) // random을 조건문에 넣어주기 
        {
            console.log("받은 블록체인 길이가 같다")
            blocks = receiveBlockchain;

        }
    }
    else{
        console.log("받은 블록체인에 문제")
    }
}

const handleBlockchainResponse = (receiveBlockchain) => {
    // 받은 블록체인보다 현재 블록체인이 더 길다 (안 바꿈)



    // 같으면 (바꾸거나 안 바꿈)


    
    // 받은 블록체인이 현재 블록체인보다 더 길다 (바꿈)

}

const queryLatestMessage = () => {
    return ({
            "type":MessageType.QUERY_LATEST,
            "data":null
    })
}
const queryAllMessage = () => {
    return ({
            "type":MessageType.QUERY_ALL,
            "data":null
    })
}
const responseLatestMessage = () => {
    return ({
            "type":MessageType.RESPONSE_BLOCKCHAIN ,
            "data":JSON.stringify(getLatestBlock()) // 이렇게 보내면 JSON.parse써서 데이터 가공해야함
            // "data":getLatestBlock() // 요렇게 보내면 바로 쓰기 편하다
    })
}
const responseAllMessage = () => {
    return ({
            "type":MessageType.RESPONSE_BLOCKCHAIN ,
            "data":JSON.stringify(getBlocks())
            // "data":getBlocks()
    })
}

const write = (ws, message) => { // 보낼 상대방의 ws
    console.log("write()", message);
    ws.send(JSON.stringify(message));
}

const broadcasting = (message) => {
    sockets.forEach((socket)=>{
        write(socket, message)
    });
}

// 내가 새로운 블록을 채굴했을 때 다른 사람들에게 전파
const mineBlock = (blockData) => {
    const newBlock = createBlock(blockData);
    if(addBlock(newBlock,getLatestBlock()))
    {
        broadcasting(responseLatestMessage())
    }
}

export { initP2PServer ,connectionToPeer, broadcasting, responseLatestMessage, mineBlock};