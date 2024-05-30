import {useState,useEffect} from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, Spinner, Text,FormControl,Input, useToast } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { getSender,getSenderFull } from "../../config/ChatLogic";
import Profile from "./Profile";
import UpdateGroupChat from "./UpdateGroupChat";
import axios from "axios";
import '../styles.css'
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT="http://localhost:8000"
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage,setNewMessage]=useState("");
  const [socketConnected,setSocketConnected]=useState(false);
  const toast=useToast();


   const fetchMessages = async () => {
     if (!selectedChat) return;

     try {
       const config = {
         headers: {
           Authorization: `Bearer ${user.token}`,
         },
       };

       setLoading(true);

       const { data } = await axios.get(
         `/api/message/${selectedChat._id}`,
         config
       );
       console.log(data);
       setMessage(data);
       setLoading(false);

       socket.emit("join chat", selectedChat._id);
     } catch (error) {
       toast({
         title: "Error Occured!",
         description: "Failed to Load the Messages",
         status: "error",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
     }
   };


  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      // socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        console.log(data);
        // socket.emit("new message", data);
        setMessage([...message, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  // useEffect(() => {
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (
  //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
  //       selectedChatCompare._id !== newMessageRecieved.chat._id
  //     ) {
  //       if (!notification.includes(newMessageRecieved)) {
  //         setNotification([newMessageRecieved, ...notification]);
  //         setFetchAgain(!fetchAgain);
  //       }
  //     } else {
  //       setMessages([...messages, newMessageRecieved]);
  //     }
  //   });
  // });

   const typingHandler = (e) => {
     setNewMessage(e.target.value);

    //  if (!socketConnected) return;

    //  if (!typing) {
    //    setTyping(true);
    //    socket.emit("typing", selectedChat._id);
    //  }
    //  let lastTypingTime = new Date().getTime();
    //  var timerLength = 3000;
    //  setTimeout(() => {
    //    var timeNow = new Date().getTime();
    //    var timeDiff = timeNow - lastTypingTime;
    //    if (timeDiff >= timerLength && typing) {
    //      socket.emit("stop typing", selectedChat._id);
    //      setTyping(false);
    //    }
    //  }, timerLength);
   };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <Box
              display={{ base: "flex", md: "none" }}
              onClick={() => setSelectedChat("")}
            >
              <MdArrowBack />
            </Box>
            {message &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <Profile user={getSenderFull(user, selectedChat.users)} />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChat
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            // bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat message={message} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {/* {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )} */}
              <Input
                variant="outline"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          w={"100%"}
        >
          <Text fontSize="3xl" mb={4}>
            Welcome to Convo!
          </Text>
          <Text fontSize="xl" mb={8}>
            Start a quick conversation with someone.
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
