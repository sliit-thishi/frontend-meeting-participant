import React from "react";
import { useState } from "react";
import mainApi from "./api2/mainApi";


function Chat(){

  const[meetingId , setMeetingId] = useState(1)
  const[empId , setEmpId] = useState(1)
  const[massages , setMassages] = useState([])
  const[massage , setMassage] = useState("Hello")
  const[receiveId , setReceiveId] = useState(2)
  const[sentLogic , setSentLogic] = useState(false)
  const[receiveLogic , setreceiveLogic] = useState(false)

  function getSent(){
      mainApi.get("/getSentMassage/"+meetingId+"/"+empId,{
      })
      .then((res) => { 
          console.log("result - ",res.data)
          setSentLogic(true)
          setreceiveLogic(false)
          setMassages(res.data)
      })
    
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }
  
    function getReceive(){
      mainApi.get("/getReceiveMassage/"+meetingId+"/"+empId,{
      })
      .then((res) => { 
          console.log("result - ",res.data)
          setSentLogic(false)
          setreceiveLogic(true)
          setMassages(res.data)
      })
    
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }
  
    function sendMassage(){
      mainApi.post("/addMassage",{
        massage : massage,
        senderId : empId,
        meetingId : meetingId,
        receiverId : receiveId
      })
      .then((res) => { 
          console.log("result - ",res.data)
      })
    
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }

  return(
      <>
      <div style={{width:"10vw" , height:"100vh", position:"relative",background:"blue", top:"0" , right:"0"}}>
      <h1>Chat</h1>
      <button onClick={getSent}>Sent</button>
      <button onClick={getReceive}>Inbox</button>
      <div>
          {receiveLogic? <div>
              {massage.length!=0 && massages.map((msg)=>(
              <p>{msg.massage} -: from -  {msg.senderName} </p>
          ))}
              </div>:<div>
              {sentLogic && <div>
              {massage.length!=0 && massages.map((msg)=>(
              <p>{msg.massage} -: to - {msg.receiverName}</p>
          ))}
              </div>}
                  </div>}
         
      </div>
      <div>
          <input placeholder="Type Your Massage" value={massage} onChange={(e)=>setMassage(e.target.value)}></input>
          <button onClick={sendMassage}>Send</button>
      </div>
      </div>
      </>
  )
}

export default Chat