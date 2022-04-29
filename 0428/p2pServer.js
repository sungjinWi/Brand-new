// peer to peer
// 다른 노드와 통신을 위한 서버

import WebSocket from "ws";
import { WebSocketServer } from "ws";

const sockets = []; //배열 시작점의 주소를 sockets에 저장


// 응답을 받는 서버의 역할
const initP2PServer = (p2pPort) => {
    const server = new WebSocketServer({port:p2pPort});
    server.on("connection", (ws) => {
        initConnection(ws);
    })
    console.log("listening P2PServer Port : ", p2pPort)
}

const initConnection = (ws) => {
    sockets.push(ws);
}

const connectionToPeer = (newPeer) => {
    const ws = new WebSocket(newPeer);
    ws.on("open", () => {initConnection(ws); return true;})
    ws.on("error", () => {console.log("Fail to Connection peer : ", ws.remoteAddress); return false;})
}

export { initP2PServer ,connectionToPeer};