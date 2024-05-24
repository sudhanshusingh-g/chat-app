import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider"
import SideNav from "../components/others/SideNav";
import MyChats from "../components/others/MyChats";
import ChatBox from "../components/others/ChatBox";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chats() {
  const navigate=useNavigate();
  const {user}=ChatState();
  console.log(user);
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) navigate("/");
    },[])

  return (
    <div style={{ width: "100%"}}>
      {user && <SideNav />}
      <Box display="flex" justifyContent="space-between" w="100%" h="85vh">
        {user && <MyChats/>}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}

export default Chats