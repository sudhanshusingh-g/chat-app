import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import {useState} from 'react'
import { FaAngleDown, FaBell, FaSearch } from 'react-icons/fa';
import { ChatState } from '../../context/ChatProvider';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
function SideNav() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {user}=ChatState();
  const navigate=useNavigate();

  const logoutHandler=()=>{
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <>
      <Box
        p={4}
        display="flex"
        justifyContent="space-between"
        borderBottomWidth="1px"
      >
        <Tooltip label="Search" placement="bottom" hasArrow>
          <Button variant="ghost" borderWidth="1px">
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
    </>
  );
}

export default SideNav;