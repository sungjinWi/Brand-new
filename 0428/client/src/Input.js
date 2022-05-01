import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";

export default function StateTextFields() {
  const [peer, setPeer] = React.useState('');
  const [chat, setChat] = React.useState('');
  const [chatList, setChatList] = React.useState([]);

  const changePeer = (e) => {
    setPeer(e.target.value);
  };

  const changeChat = (e) => {
    setChat(e.target.value)
  }

  const submitPeer = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/addPeer", {"data" : `ws://${peer}:6001`})
    
}
  const submitChat = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/sendMessage", {"data" : {"type" : 1, "message":"minwook kun~~"}})
    .then(res => {
        setChatList([...chatList, res.data])
        console.log(chatList)
        console.log(res.data)
    })
}

  return (
      <>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitPeer}
    >

      <TextField
        id="outlined-name"
        label="연결할 peer의 IP"
        name='peer'
        value={peer}
        onChange={changePeer}
      />
    <input type="submit" />
    </Box>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitChat}
    >
      <TextField
        id="outlined-uncontrolled"
        label="채팅 내용"
        name='chat'
        value={chat}
        onChange={changeChat}
      />
    <input type="submit" />

    </Box>

    </>
  );
}
