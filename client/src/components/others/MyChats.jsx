import { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogic";
import GroupChatModal from "./GroupChatModal";

function MyChats({fetchAgain}) {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser, selectedChat, setSelectedChat, chat, setChat } =
    ChatState();

  const toast = useToast();

  const fecthChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChat(data);
    } catch (error) {
      toast({
        title: "Error occured!",
        description: "Failed to load the chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fecthChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems={"center"}
      p={3}
      width={{ base: "100%", md: "32%" }}
      borderWidth="0px 1px 0px 0"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "1.2rem", md: "2rem" }}
        fontFamily={"Lato"}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        Chats
        <GroupChatModal>
          <Button display={"flex"} alignItems={"center"} gap={"0.4rem"}>
            <GoPlus />
            Create Group
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        p={2}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chat ? (
          <Stack overflowY={"scroll"}>
            {chat.map((c) => (
              <Box
                key={c._id}
                onClick={() => setSelectedChat(c)}
                cursor={"pointer"}
                bg={selectedChat === c ? "teal" : "#efefef"}
                color={selectedChat === c ? "#fff" : "#000"}
                px={3}
                py={4}
                borderRadius={"lg"}
              >
                <Text>
                  {!c.isGroupChat
                    ? getSender(loggedUser, c.users)
                    : c.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
