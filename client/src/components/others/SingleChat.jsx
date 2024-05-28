import React from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, Text } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { getSender,getSenderFull } from "../../config/ChatLogic";
import Profile from "./Profile";
import UpdateGroupChat from "./UpdateGroupChat";


function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();
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
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <Profile user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChat
                    // fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
              </>
            )}
          </Text>

          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            

            
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
