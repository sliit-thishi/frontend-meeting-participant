import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import {storage} from "./resources/Firebase";
import {ref , uploadBytes , getDownloadURL} from "firebase/storage";
import shareApi from "./api/shareApi";
import image1 from "./1.png"
import Chat from "./Chat";

function App() {

  const[imageUrl ,setImageUrl] = useState("")
  const[latestId , setLatestId] = useState(0)
  const[baseUrl , setBaseUrl] = useState("")
  const[buttoKey , setButtonKey] = useState("Share")
  const image2 = "https://firebasestorage.googleapis.com/v0/b/uploadimages-c8bef.appspot.com/o/movieMania%2FmovieImage%2F7?alt=media&token=8b0e538e-cf2d-432e-96ed-b767f37e43c7"
  const image3 = "https://firebasestorage.googleapis.com/v0/b/uploadimages-c8bef.appspot.com/o/movieMania%2FmovieImage%2F0?alt=media&token=e3821c4c-1c96-4ddd-b37a-f2278bbd13bb"

  // function setShare(){

  //   var logic = localStorage.getItem("shareLogic")
  //   if(logic==="true"){
  //     localStorage.setItem("shareLogic","false")
  //     setButtonKey("Share")
  //   }
  //   else{
  //     localStorage.setItem("shareLogic","true")
  //     setButtonKey("Stop")
  //   }
  // }



  function getShared(){
    shareApi.get("/getFromClient",{
    })
    .then((res) => { 
        console.log("result - ",res.data)
        setBaseUrl(res.data)
    })
  
  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
  }

  var timer
  useEffect(()=>{
    timer = setInterval(()=>{
                getShared()
  },800)
  return()=>clearTimeout(timer)
  },[])
  return (
    <>
    <div>
        <div style={{width:"100vw" , height:"100vh", position:"relative",background:"green", top:"0" , left:"0"}}>
        <div style={{width:"80vw",position:"absolute",background:"black" , height:"60vh" , top:"20vh" , left:"10vw"}}>
        <img src={baseUrl} alt="No Shared" style={{width:"100%",position:"absolute",color:"white" , height:"100%" , top:"0" , left:"0"}}></img>
        </div>
        </div>
        <div style={{width:"20vw" , height:"100vh", position:"absolute",background:"blue", top:"0" , right:"0"}}>
        <Chat></Chat>
        </div>
      </div>
    </>
  );
}

export default App;
