import ecdsa from "elliptic";

const ec = new ecdsa.ec("secp256k1");

const createPrivateKey = () => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate();

    console.log(privateKey)
}

createPrivateKey();