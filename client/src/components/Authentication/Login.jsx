import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  VStack,
  Input,
  InputRightElement,
  InputGroup,
  useToast,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
    const [loading, setLoading] = useState(false);
  //
  const handleSubmit = async() => {
    setLoading(true);
    if ( !email || !password) {
      toast({
        title: "Please fill all the required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });

      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Something bad happened!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }


  };


  return (
    <VStack spacing={4}>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="Enter you email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? <FaEye /> : <FaEyeSlash />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="cyan"
        textColor="white"
        onClick={handleSubmit}
        width="100%"
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        colorScheme="red"
        variant="solid"
        textColor="white"
        onClick={()=>{
            setEmail("guest@example.com");
            setpassword("123456");
        }}
        width="100%"
      >
        Guest user
      </Button>
    </VStack>
  );
}

export default Login;
