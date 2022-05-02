// peer to peer
// 다른 노드와 통신을 위한 서버

import WebSocket from "ws";
import { WebSocketServer } from "ws";
import { getBlocks, getLatestBlock } from "./block.js"

let receivedMsg = "";

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
        initConnection(ws);
    })
    
    
    console.log("listening P2PServer Port : ", p2pPort)
}

const initConnection = (ws) => {
    sockets.push(ws);
    initMessageHandler(ws);
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
                ws.send(responseLatestMessage())
                break;
            case MessageType.QUERY_ALL:
                ws.send()
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:

                break;
        }
    })
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
            "data":JSON.stringify(getLatestBlock())
    })
}
const responseAllMessage = () => {
    return ({
            "type":MessageType.RESPONSE_BLOCKCHAIN ,
            "data":JSON.stringify(getBlocks())
    })
}

const write = (ws, message) => { // 보낼 상대방의 ws
    console.log("write()", message)
    ws.send(JSON.stringify(message));
}

const sendMessage = (message) => {
    sockets.forEach((socket)=>{
        write(socket, message)
    });
}

export { initP2PServer ,connectionToPeer, sendMessage};