// 웹에 명령어를 입력해서 내 노드를 제어하는 서버

//require는 common js에서 다 불러 온다 import는 express만 따로 // import가 훨씬 compact함
//import쓰려면 package.json에 추가
import express from "express"; 
import { getBlocks, createBlock} from "./block.js";
// 위의 함수들에서는 blocks가 선언된 코드가 없는데 변수를 잘 가져온다?????
import { connectionToPeer, sendMessage } from "./p2pServer.js";
import cors from "cors"

// 초기화 함수
const initHttpServer = (myHttpPort) => {
    const app = express();
    app.use(express.json()); // express에 bodyparser 내장됨
    app.use(express.urlencoded({extended : true}));

    app.use(cors());

    app.get("/", (req, res) => {
        res.send("Hello world!")
    })

    app.get("/blocks", (req, res) => {
        res.send(getBlocks());
    })

    app.post("/createBlock",(req, res) => {
        res.send(createBlock(req.body.data))
        // postman에서 body / raw / json 으로 "data":"something"
    })

    app.post("/addPeer", (req, res) => {
        console.log(req.body.data)
        res.send(connectionToPeer(req.body.data));
    })

    app.post("/sendMessage", (req, res) => {
        sendMessage(req.body.data)
        res.send(req.body.data.message)
    })

    app.listen(myHttpPort, ()=>  {
        console.log("listening httpServer... Port : ", myHttpPort)
    })
}

export { initHttpServer }; // 함수를 export 할 때