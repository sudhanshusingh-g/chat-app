import { Box } from "@chakra-ui/layout";
import {ChatState} from "../../context/ChatProvider"
import SingleChat from "./SingleChat";
function ChatBox({ fetchAgain ,setFetchAgain}) {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      w={{ base: "100%", md: "68%" }}
      backdropFilter="blur(5px)"
      backgroundColor="rgba(255, 255, 255, 0.5)"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}

export default ChatBox;
