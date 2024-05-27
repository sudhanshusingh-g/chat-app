import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider"
import SideNav from "../components/others/SideNav";
import MyChats from "../components/others/MyChats";
import ChatBox from "../components/others/ChatBox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Chats() {
  const navigate=useNavigate();
  const {user}=ChatState();
  const [fetchAgain,setFetchAgain]=useState(false)
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) navigate("/");
    },[])

  return (
    <div style={{ width: "100%" }}>
      {user && <SideNav />}
      <Box display="flex" justifyContent="space-between" w="100%" h="85vh">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
}

export default Chats