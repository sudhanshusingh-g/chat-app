import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import {useState} from 'react'
import { FaAngleDown, FaArrowRight, FaBell, FaSearch } from 'react-icons/fa';
import { ChatState } from '../../context/ChatProvider';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserList from './UserList';
function SideNav() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {user,chats,setChats,setSelectedChat}=ChatState();
  const navigate=useNavigate();
  const toast=useToast();

  const logoutHandler=()=>{
    localStorage.removeItem("user");
    navigate("/");
  }

  const handleSearch=async()=>{
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };


  

  return (
    <>
      <Box
        p={4}
        display="flex"
        justifyContent="space-between"
        borderBottomWidth="1px"
      >
        <Tooltip label="Search" placement="bottom" hasArrow>
          <Button variant="ghost" borderWidth="1px" onClick={onOpen}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} marginLeft="0.8rem">
              Search user
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="3xl" fontFamily="Lato" as="i">
          Convo
        </Text>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Menu>
            <MenuButton p={1}>
              <FaBell style={{ fontSize: "1.4rem" }} />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<FaAngleDown />} py={2}>
              <Avatar size="xs" name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <Profile user={user}>
                <MenuItem>Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Begin your conversation!
          </DrawerHeader>
          <DrawerBody>
            <Box display="flex" alignItems="center" gap="1rem" pb={2}>
              <Input
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button colorScheme="teal" onClick={handleSearch}>
                <FaArrowRight />
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserList
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideNav;