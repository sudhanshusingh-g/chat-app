import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [chat, setChat] = useState([]);
   const [selectedChat, setSelectedChat] = useState();
   const [notification, setNotification] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]); 
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chat,
        setChat,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
