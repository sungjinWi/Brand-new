// peer to peer
// 다른 노드와 통신을 위한 서버

import WebSocket from "ws";
import { WebSocketServer } from "ws";

const MessageType = {
    RESPONSE_MESSAGE : 0,
    SEND_MESSAGE : 1

    // 최신 블록 요청
    // 모든 블록 요청
    // 블록 전달
}

const sockets = []; //배열 시작점의 주소를 sockets에 저장


// 응답을 받는 서버의 역할
const initP2PServer = (p2pPort) => {
    const server = new WebSocketServer({port:p2pPort});
    server.on("connection", (ws) => {
        console.log("someone ws connected to me")
        initConnection(ws);
        initMessageHandler(ws);
    })
    
    
    console.log("listening P2PServer Port : ", p2pPort)
}

const initConnection = (ws) => {
    sockets.push(ws);
    initMessageHandler(ws)
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
            case MessageType.RESPONSE_MESSAGE : // 메세지 받았을 때
            
                break;
            case MessageType.SEND_MESSAGE :
                write(ws, message)
                break;
        }
    })
}

const write = (ws, message) => {
    ws.send(JSON.stringify(message));
}

const sendMessage = (message) => {
    sockets.forEach((socket)=>{
        write(socket, message)
    });
}

export { initP2PServer ,connectionToPeer, sendMessage};