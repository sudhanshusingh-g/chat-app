import {useEffect} from 'react'
import {Box, Container, Text} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();
   useEffect(() => {
     const user = JSON.parse(localStorage.getItem("user"));

     if (user) navigate("/chats");
     // eslint-disable-next-line
   }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box d="flex" justifyContent="center" p={4}>
        <Text fontSize="4xl" as="i" fontFamily="Lato">
          Convo
        </Text>
      </Box>
      <Box p={4} bg="white" width="100%" borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage