import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client';
import {over} from 'stompjs';
let stompClient:any;
interface PublicChat {
    status: string;
    message:string;
    senderName:string;
}

interface ChatRoomProps {
    name: string;
}

const ChatRoom:React.FC<ChatRoomProps> = ({name}) => {
    const [publicChats,setPublicChats]=useState<PublicChat[]>([]);
    const [privateChats,setPrivateChats]=useState(new Map<string,any>());
    const [tab,setTab]=useState("CHATROOM");
    const [userData, setUserData] =useState({
        username:name,
        receivername:"",
        connected:false,
        message:"",
    });
    useEffect(() => {
        if(userData.username===name && userData.connected===false){
            setTimeout(()=>{
                connect();
            },2000);
        }
    }, []);
   
    const handleValue =(event:any)=>{
        const {value,name} =event.target;
        setUserData({...userData,[name]:value})
    };
    const connect =()=>{
        let Sock = new SockJS('http://localhost:9090/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }
  
    const registerUser=()=>{
        connect(); 
    };
    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
        stompClient.subscribe('/chat/'+userData.username+'/private', onPrivateMessageReceived);
        userJoin();
    }

    const userJoin=()=>{
        let chatMessage = {
          senderName: userData.username,
          status:"JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
       
    }
    const onPublicMessageReceived=(payload:any):void=>{
        let payloadData =JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    };
    const onPrivateMessageReceived=(payload:any)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    };
    const onError =(err:any)=>{
        console.log(err);
    };

    const sendPublicMessage=()=>{
        if(stompClient){
            let chatmessage={
                senderName:userData.username,
                message:userData.message,
                status:"MESSAGE"
            };
            stompClient.send('/app/message',{},JSON.stringify(chatmessage));
            setUserData({...userData,"message":""})

        }
    };
    const sendPrivateMessage=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }
  return (
    <div className="container">
        {userData.connected?
        <div className='chat-box'>
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>ChatRoom</li>
                    {Array.from(privateChats.keys()).map((name, index) => (
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
            {tab==='CHATROOM'&&<div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                                <li className='message' key={index}>
                                    {chat.senderName !== userData.username && <div className='avatar'>{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName !== userData.username && <div className='avatar self'>{chat.senderName}</div>}
                                </li>
                            ))}
                 </ul>
                 <div className='send-message'>
                    <input type='text' className='input-message' name='message'
                        placeholder='enter public message' value={userData.message}  onChange={handleValue} />
                    <button type='button' className='send-button' onClick={sendPublicMessage}>SEND</button>
                 </div>
            </div>
            }
            {tab!=='CHATROOM'&&<div className="chat-content">
                <ul className='chat-messages'>
                 {[...privateChats.get(tab)].map((chat,index)=>(
                    <li className='message' key={index}>
                        {chat.senderName !== userData.username && <div className='avatar'>{chat.senderName}</div>}
                        <div className="message-data">{chat.message}</div>
                        {chat.senderName !== userData.username && <div className='avatar self'>{chat.senderName}</div>}
                    </li>
                 ))}
                </ul>
                    <div className='send-message'>
                    <input type='text' className='input-message' name='message'
                    placeholder={`enter private message for ${tab}`} value={userData.message}  onChange={handleValue} />
                    <button type='button' className='send-button' onClick={sendPrivateMessage}>private</button>
                    </div>
            </div>}
        </div>
        :<div className='register'>
           <input id='user-name' name='username' placeholder='Enter the user name' value={userData.username} onChange={handleValue} />
            <button type='button' onClick={registerUser}>connect</button>
        </div>}

    </div>
    )
}

export default ChatRoom